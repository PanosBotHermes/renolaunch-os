import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const subaccount = await db.subaccount.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        trade: true,
        status: true,
        plan: true,
        contactName: true,
        contactEmail: true,
        healthScore: true,
        dailyLimit: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            contacts: true,
          },
        },
      },
    });

    if (!subaccount) {
      return NextResponse.json({ error: "Subaccount not found" }, { status: 404 });
    }

    return NextResponse.json(subaccount);
  } catch (error) {
    console.error("GET /api/subaccounts/[id] failed", error);
    return NextResponse.json({ error: "Failed to fetch subaccount" }, { status: 500 });
  }
}
