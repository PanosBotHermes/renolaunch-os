import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const subaccounts = await db.subaccount.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        trade: true,
        status: true,
        plan: true,
        healthScore: true,
        dailyLimit: true,
        _count: {
          select: {
            contacts: true,
          },
        },
      },
    });

    return NextResponse.json(subaccounts);
  } catch (error) {
    console.error("GET /api/subaccounts failed", error);
    return NextResponse.json({ error: "Failed to fetch subaccounts" }, { status: 500 });
  }
}
