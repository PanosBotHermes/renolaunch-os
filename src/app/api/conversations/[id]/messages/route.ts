export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const messages = await db.message.findMany({
      where: {
        conversationId: id,
      },
      orderBy: {
        sentAt: "asc",
      },
      select: {
        id: true,
        direction: true,
        body: true,
        isAI: true,
        sentAt: true,
      },
    });

    return NextResponse.json(messages);
  } catch {
    return NextResponse.json([]);
  }
}
