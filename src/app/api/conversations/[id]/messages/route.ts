export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  GHL_ACCOUNTS,
  findGHLContactByPhone,
  findGHLConversation,
  ghlPost,
} from "@/lib/ghl-config";

// ─── GET: fetch messages for a conversation ───────────────────────────────────
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const messages = await db.message.findMany({
      where: { conversationId: id },
      orderBy: { sentAt: "asc" },
      select: { id: true, direction: true, body: true, isAI: true, sentAt: true },
    });
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json([]);
  }
}

// ─── POST: send an SMS via GHL, save to Neon ─────────────────────────────────
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: conversationId } = await params;
    const { body: messageBody } = (await request.json()) as { body: string };

    if (!messageBody?.trim()) {
      return NextResponse.json({ error: "Message body is required" }, { status: 400 });
    }

    // 1. Load conversation + contact + subaccount slug from Neon
    const conversation = await db.conversation.findUnique({
      where: { id: conversationId },
      include: {
        contact: { select: { phone: true } },
        subaccount: { select: { slug: true } },
      },
    });

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    const { slug } = conversation.subaccount;
    const { phone } = conversation.contact;
    const ghlAccount = GHL_ACCOUNTS[slug];

    if (!ghlAccount) {
      return NextResponse.json({ error: `No GHL account configured for ${slug}` }, { status: 500 });
    }

    const { token, locationId } = ghlAccount;

    // 2. Find GHL contact by phone
    const ghlContactId = await findGHLContactByPhone(phone, locationId, token);
    if (!ghlContactId) {
      return NextResponse.json({ error: "Could not find GHL contact for this phone number" }, { status: 422 });
    }

    // 3. Find GHL conversation
    const ghlConversationId = await findGHLConversation(ghlContactId, locationId, token);
    if (!ghlConversationId) {
      return NextResponse.json({ error: "Could not find GHL conversation" }, { status: 422 });
    }

    // 4. Send SMS via GHL
    await ghlPost("/conversations/messages", token, {
      type: "SMS",
      conversationId: ghlConversationId,
      message: messageBody.trim(),
    });

    // 5. Save outbound message to Neon
    const now = new Date();
    const saved = await db.message.create({
      data: {
        conversationId,
        direction: "OUTBOUND",
        body: messageBody.trim(),
        isAI: false,
        sentAt: now,
      },
      select: { id: true, direction: true, body: true, isAI: true, sentAt: true },
    });

    // 6. Update conversation lastMessageAt
    await db.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: now },
    });

    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
