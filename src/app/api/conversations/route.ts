import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { findSubaccountByIdOrSlug } from "@/lib/subaccounts";

const querySchema = z.object({
  subaccountId: z.string().min(1),
});

export async function GET(request: Request) {
  try {
    const parsed = querySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const subaccount = await findSubaccountByIdOrSlug(parsed.data.subaccountId);

    if (!subaccount) {
      return NextResponse.json({ error: "Subaccount not found" }, { status: 404 });
    }

    const conversations = await db.conversation.findMany({
      where: {
        subaccountId: subaccount.id,
      },
      orderBy: [{ lastMessageAt: "desc" }, { createdAt: "desc" }],
      include: {
        contact: {
          select: {
            id: true,
            businessName: true,
            contactName: true,
            phone: true,
            status: true,
            stage: true,
          },
        },
        messages: {
          take: 1,
          orderBy: {
            sentAt: "desc",
          },
        },
      },
    });

    return NextResponse.json(
      conversations.map((conversation) => ({
        id: conversation.id,
        status: conversation.status,
        aiHandling: conversation.aiHandling,
        createdAt: conversation.createdAt,
        lastMessageAt: conversation.lastMessageAt,
        contact: conversation.contact,
        lastMessage: conversation.messages[0] ?? null,
      })),
    );
  } catch (error) {
    console.error("GET /api/conversations failed", error);
    return NextResponse.json({ error: "Failed to fetch conversations" }, { status: 500 });
  }
}
