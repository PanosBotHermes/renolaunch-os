import { ContactStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { findSubaccountByIdOrSlug } from "@/lib/subaccounts";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const subaccount = await findSubaccountByIdOrSlug(id);

    if (!subaccount) {
      return NextResponse.json({ error: "Subaccount not found" }, { status: 404 });
    }

    const [contacts, conversations, booked, replied] = await db.$transaction([
      db.contact.count({ where: { subaccountId: subaccount.id } }),
      db.conversation.count({ where: { subaccountId: subaccount.id } }),
      db.contact.count({
        where: {
          subaccountId: subaccount.id,
          status: ContactStatus.BOOKED,
        },
      }),
      db.contact.count({
        where: {
          subaccountId: subaccount.id,
          status: {
            in: [ContactStatus.REPLIED, ContactStatus.QUALIFIED, ContactStatus.BOOKED],
          },
        },
      }),
    ]);

    const replyRate = contacts === 0 ? 0 : Number(((replied / contacts) * 100).toFixed(1));

    return NextResponse.json({
      contacts,
      conversations,
      booked,
      replyRate,
    });
  } catch (error) {
    console.error("GET /api/stats/subaccount/[id] failed", error);
    return NextResponse.json({ error: "Failed to fetch subaccount stats" }, { status: 500 });
  }
}
