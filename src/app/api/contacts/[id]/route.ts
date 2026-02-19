import { ContactStatus, PipelineStage, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const updateContactSchema = z.object({
  status: z.nativeEnum(ContactStatus).optional(),
  stage: z.nativeEnum(PipelineStage).optional(),
  notes: z.string().nullable().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const parsed = updateContactSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    if (
      parsed.data.status === undefined &&
      parsed.data.stage === undefined &&
      parsed.data.notes === undefined
    ) {
      return NextResponse.json(
        { error: "At least one of status, stage, or notes is required" },
        { status: 400 },
      );
    }

    const contact = await db.contact.update({
      where: { id },
      data: {
        status: parsed.data.status,
        stage: parsed.data.stage,
        notes: parsed.data.notes,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    console.error("PATCH /api/contacts/[id] failed", error);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}
