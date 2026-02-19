import { db } from "@/lib/db";
import { PipelineBoard } from "./PipelineBoard";

export const dynamic = "force-dynamic";

export default async function SubaccountPipelinesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;

  let stageGroups: Record<string, { id: string; businessName: string; phone: string; city: string | null; state: string | null; createdAt: Date }[]> = {
    OLD: [],
    NEW_LEAD: [],
    CONTACTED: [],
    REPLIED: [],
    QUALIFIED: [],
    BOOKED: [],
    CLOSED: [],
  };

  let totalContacts = 0;

  try {
    const subaccount = await db.subaccount.findUnique({ where: { slug }, select: { id: true } });

    if (subaccount) {
      const contacts = await db.contact.findMany({
        where: { subaccountId: subaccount.id },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          businessName: true,
          phone: true,
          city: true,
          state: true,
          stage: true,
          createdAt: true,
        },
      });

      for (const c of contacts) {
        stageGroups[c.stage]?.push({ id: c.id, businessName: c.businessName, phone: c.phone, city: c.city, state: c.state, createdAt: c.createdAt });
      }

      totalContacts = contacts.length;
    }
  } catch {
    // DB unavailable — show empty state
  }

  return (
    <PipelineBoard
      stageGroups={stageGroups}
      totalContacts={totalContacts}
    />
  );
}
