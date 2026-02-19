export const dynamic = "force-dynamic";

import type { ContactStatus, PipelineStage, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const CONTACT_STATUSES = [
  "NEW",
  "CONTACTED",
  "REPLIED",
  "QUALIFIED",
  "BOOKED",
  "DNC",
] as const satisfies readonly ContactStatus[];

const PIPELINE_STAGES = [
  "OLD",
  "NEW_LEAD",
  "CONTACTED",
  "REPLIED",
  "QUALIFIED",
  "BOOKED",
  "CLOSED",
] as const satisfies readonly PipelineStage[];

function parsePositiveInt(value: string | null, defaultValue: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return defaultValue;
  return parsed;
}

function parseContactStatus(value: string | null): ContactStatus | undefined {
  if (!value) return undefined;
  return CONTACT_STATUSES.includes(value as ContactStatus) ? (value as ContactStatus) : undefined;
}

function parsePipelineStage(value: string | null): PipelineStage | undefined {
  if (!value) return undefined;
  return PIPELINE_STAGES.includes(value as PipelineStage) ? (value as PipelineStage) : undefined;
}

function emptyResponse(page = 1) {
  return {
    contacts: [],
    total: 0,
    page,
    totalPages: 0,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const slug = searchParams.get("subaccountId");
    const page = parsePositiveInt(searchParams.get("page"), 1);
    const limit = Math.min(parsePositiveInt(searchParams.get("limit"), 20), 100);
    const search = searchParams.get("search")?.trim() ?? "";
    const status = parseContactStatus(searchParams.get("status"));
    const stage = parsePipelineStage(searchParams.get("stage"));

    if (!slug) return NextResponse.json(emptyResponse(page));

    const subaccount = await db.subaccount.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!subaccount) return NextResponse.json(emptyResponse(page));

    const where: Prisma.ContactWhereInput = {
      subaccountId: subaccount.id,
    };

    if (search) {
      where.OR = [
        { businessName: { contains: search, mode: "insensitive" } },
        { contactName: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) where.status = status;
    if (stage) where.stage = stage;

    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      db.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          businessName: true,
          contactName: true,
          phone: true,
          city: true,
          state: true,
          trade: true,
          status: true,
          stage: true,
          createdAt: true,
        },
      }),
      db.contact.count({ where }),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
    return NextResponse.json({ contacts, total, page, totalPages });
  } catch {
    return NextResponse.json(emptyResponse());
  }
}
