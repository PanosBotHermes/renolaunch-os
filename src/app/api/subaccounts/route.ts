export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { STATIC_SUBACCOUNTS } from "@/lib/static-data";
import { db } from "@/lib/db";

function normalizeValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

async function resolveUniqueSlug(base: string) {
  const root = base || "client";
  let slug = root;
  let suffix = 2;

  while (await db.subaccount.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${root}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function GET() {
  try {
    const rows = await db.subaccount.findMany({
      orderBy: { createdAt: "asc" },
      select: { id:true, name:true, slug:true, trade:true, status:true, plan:true, healthScore:true, dailyLimit:true, _count:{ select:{ contacts:true } } },
    });
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json(STATIC_SUBACCOUNTS);
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as unknown;
    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const body = payload as {
      name?: unknown;
      trade?: unknown;
      contactName?: unknown;
      contactEmail?: unknown;
      dailyLimit?: unknown;
    };

    const name = normalizeValue(body.name);
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const trade = normalizeValue(body.trade);
    const contactName = normalizeValue(body.contactName);
    const contactEmail = normalizeValue(body.contactEmail);
    const parsedDailyLimit =
      typeof body.dailyLimit === "number"
        ? body.dailyLimit
        : Number.parseInt(String(body.dailyLimit ?? ""), 10);
    const dailyLimit = Number.isFinite(parsedDailyLimit) && parsedDailyLimit > 0 ? parsedDailyLimit : 500;

    const slug = await resolveUniqueSlug(toSlug(name));

    const created = await db.subaccount.create({
      data: {
        name,
        slug,
        trade,
        contactName,
        contactEmail,
        dailyLimit,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        trade: true,
        status: true,
        plan: true,
        healthScore: true,
        dailyLimit: true,
        _count: { select: { contacts: true } },
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create subaccount" }, { status: 500 });
  }
}
