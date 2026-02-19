import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const conversation = await db.conversation.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    const messages = await db.message.findMany({
      where: {
        conversationId: id,
      },
      orderBy: {
        sentAt: "asc",
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("GET /api/conversations/[id]/messages failed", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
