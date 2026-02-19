import { ContactStatus, PipelineStage, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { findSubaccountByIdOrSlug } from "@/lib/subaccounts";

const contactsQuerySchema = z.object({
  subaccountId: z.string().min(1),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().default(""),
  status: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.nativeEnum(ContactStatus).optional(),
  ),
  stage: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.nativeEnum(PipelineStage).optional(),
  ),
});

const createContactSchema = z.object({
  businessName: z.string().min(1),
  phone: z.string().min(1),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  trade: z.string().trim().optional(),
  subaccountId: z.string().min(1),
});

export async function GET(request: Request) {
  try {
    const parsed = contactsQuerySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { subaccountId, page, limit, search, status, stage } = parsed.data;
    const subaccount = await findSubaccountByIdOrSlug(subaccountId);

    if (!subaccount) {
      return NextResponse.json({ error: "Subaccount not found" }, { status: 404 });
    }

    const where: Prisma.ContactWhereInput = {
      subaccountId: subaccount.id,
    };

    if (search.trim()) {
      const trimmed = search.trim();
      where.OR = [
        { businessName: { contains: trimmed, mode: "insensitive" } },
        { contactName: { contains: trimmed, mode: "insensitive" } },
        { phone: { contains: trimmed, mode: "insensitive" } },
        { city: { contains: trimmed, mode: "insensitive" } },
        { state: { contains: trimmed, mode: "insensitive" } },
        { trade: { contains: trimmed, mode: "insensitive" } },
      ];
    }

    if (status) where.status = status;
    if (stage) where.stage = stage;

    const [total, contacts] = await db.$transaction([
      db.contact.count({ where }),
      db.contact.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      subaccount: {
        id: subaccount.id,
        slug: subaccount.slug,
        name: subaccount.name,
      },
    });
  } catch (error) {
    console.error("GET /api/contacts failed", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { subaccountId, ...rest } = parsed.data;
    const subaccount = await findSubaccountByIdOrSlug(subaccountId);

    if (!subaccount) {
      return NextResponse.json({ error: "Subaccount not found" }, { status: 404 });
    }

    const contact = await db.contact.create({
      data: {
        ...rest,
        subaccountId: subaccount.id,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("POST /api/contacts failed", error);
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
  }
}
