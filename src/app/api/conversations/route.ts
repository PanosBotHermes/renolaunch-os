export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function parsePositiveInt(value: string | null, defaultValue: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return defaultValue;
  return parsed;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("subaccountId");
    const limit = Math.min(parsePositiveInt(searchParams.get("limit"), 20), 100);

    if (!slug) return NextResponse.json([]);

    const subaccount = await db.subaccount.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!subaccount) return NextResponse.json([]);

    const conversations = await db.conversation.findMany({
      where: { subaccountId: subaccount.id },
      take: limit,
      orderBy: [
        { lastMessageAt: { sort: "desc", nulls: "last" } },
        { createdAt: "desc" },
      ],
      select: {
        id: true,
        status: true,
        aiHandling: true,
        lastMessageAt: true,
        createdAt: true,
        contact: {
          select: {
            id: true,
            businessName: true,
            phone: true,
          },
        },
        messages: {
          select: {
            body: true,
            direction: true,
            sentAt: true,
          },
          orderBy: {
            sentAt: "desc",
          },
          take: 1,
        },
      },
    });

    const payload = conversations.map((conversation) => ({
      id: conversation.id,
      status: conversation.status,
      aiHandling: conversation.aiHandling,
      lastMessageAt: conversation.lastMessageAt,
      createdAt: conversation.createdAt,
      contact: conversation.contact,
      lastMessage: conversation.messages[0] ?? null,
    }));

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json([]);
  }
}
