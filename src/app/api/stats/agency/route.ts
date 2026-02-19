import { SubaccountStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [totalSubaccounts, totalContacts, totalConversations, activeSubaccounts] = await db.$transaction([
      db.subaccount.count(),
      db.contact.count(),
      db.conversation.count(),
      db.subaccount.count({
        where: {
          status: SubaccountStatus.ACTIVE,
        },
      }),
    ]);

    return NextResponse.json({
      totalSubaccounts,
      totalContacts,
      totalConversations,
      activeSubaccounts,
    });
  } catch (error) {
    console.error("GET /api/stats/agency failed", error);
    return NextResponse.json({ error: "Failed to fetch agency stats" }, { status: 500 });
  }
}
