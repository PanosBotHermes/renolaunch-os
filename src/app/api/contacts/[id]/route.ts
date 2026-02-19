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

function parseContactStatus(value: unknown): ContactStatus | undefined {
  if (typeof value !== "string") return undefined;
  return CONTACT_STATUSES.includes(value as ContactStatus) ? (value as ContactStatus) : undefined;
}

function parsePipelineStage(value: unknown): PipelineStage | undefined {
  if (typeof value !== "string") return undefined;
  return PIPELINE_STAGES.includes(value as PipelineStage) ? (value as PipelineStage) : undefined;
}

function emptyContact() {
  return {};
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const contact = await db.contact.findUnique({
      where: { id },
      select: {
        id: true,
        subaccountId: true,
        businessName: true,
        contactName: true,
        phone: true,
        city: true,
        state: true,
        trade: true,
        status: true,
        stage: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(contact ?? emptyContact());
  } catch {
    return NextResponse.json(emptyContact());
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await request.json()) as unknown;

    if (!body || typeof body !== "object") return NextResponse.json(emptyContact());

    const payload = body as {
      status?: unknown;
      stage?: unknown;
      notes?: unknown;
    };

    const data: Prisma.ContactUpdateInput = {};

    const status = parseContactStatus(payload.status);
    if (status) data.status = status;

    const stage = parsePipelineStage(payload.stage);
    if (stage) data.stage = stage;

    if (typeof payload.notes === "string") {
      data.notes = payload.notes;
    }

    if (Object.keys(data).length === 0) {
      const existing = await db.contact.findUnique({
        where: { id },
        select: {
          id: true,
          subaccountId: true,
          businessName: true,
          contactName: true,
          phone: true,
          city: true,
          state: true,
          trade: true,
          status: true,
          stage: true,
          notes: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return NextResponse.json(existing ?? emptyContact());
    }

    const contact = await db.contact.update({
      where: { id },
      data,
      select: {
        id: true,
        subaccountId: true,
        businessName: true,
        contactName: true,
        phone: true,
        city: true,
        state: true,
        trade: true,
        status: true,
        stage: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(contact);
  } catch {
    return NextResponse.json(emptyContact());
  }
}
