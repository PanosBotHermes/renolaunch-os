export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { STATIC_AGENCY_STATS } from "@/lib/static-data";

export async function GET() {
  try {
    const { db } = await import("@/lib/db");
    const [totalSubaccounts, totalContacts, totalConversations, activeSubaccounts] = await Promise.all([
      db.subaccount.count(),
      db.contact.count(),
      db.conversation.count(),
      db.subaccount.count({ where: { status: "ACTIVE" } }),
    ]);
    return NextResponse.json({ totalSubaccounts, totalContacts, totalConversations, activeSubaccounts });
  } catch {
    return NextResponse.json(STATIC_AGENCY_STATS);
  }
}
