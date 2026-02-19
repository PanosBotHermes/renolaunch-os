export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { STATIC_SUBACCOUNTS } from "@/lib/static-data";

export async function GET() {
  try {
    const { db } = await import("@/lib/db");
    const rows = await db.subaccount.findMany({
      orderBy: { createdAt: "asc" },
      select: { id:true, name:true, slug:true, trade:true, status:true, plan:true, healthScore:true, dailyLimit:true, _count:{ select:{ contacts:true } } },
    });
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json(STATIC_SUBACCOUNTS);
  }
}
