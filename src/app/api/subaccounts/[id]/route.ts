export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function emptySubaccount(slug = "") {
  return {
    id: "",
    name: "",
    slug,
    trade: null,
    status: "INACTIVE" as const,
    plan: "BASIC" as const,
    healthScore: 0,
    dailyLimit: 0,
    _count: {
      contacts: 0,
      conversations: 0,
    },
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
            conversations: true,
          },
        },
      },
    });

    if (!subaccount) return NextResponse.json(emptySubaccount(slug));
    return NextResponse.json(subaccount);
  } catch {
    return NextResponse.json(emptySubaccount());
  }
}
