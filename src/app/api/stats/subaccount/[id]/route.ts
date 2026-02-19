export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function zeroStats() {
  return {
    contacts: 0,
    conversations: 0,
    booked: 0,
    replyRate: 0,
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: slug } = await params;

    const subaccount = await db.subaccount.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!subaccount) return NextResponse.json(zeroStats());

    const [contacts, conversations, booked, repliedConversations] = await Promise.all([
      db.contact.count({ where: { subaccountId: subaccount.id } }),
      db.conversation.count({ where: { subaccountId: subaccount.id } }),
      db.contact.count({ where: { subaccountId: subaccount.id, stage: "BOOKED" } }),
      db.conversation.count({
        where: {
          subaccountId: subaccount.id,
          messages: {
            some: {
              direction: "INBOUND",
            },
          },
        },
      }),
    ]);

    const replyRate =
      conversations === 0 ? 0 : Number(((repliedConversations / conversations) * 100).toFixed(2));

    return NextResponse.json({ contacts, conversations, booked, replyRate });
  } catch {
    return NextResponse.json(zeroStats());
  }
}
