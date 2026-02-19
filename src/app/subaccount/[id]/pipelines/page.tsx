import { db } from "@/lib/db";
import { PipelineBoard } from "./PipelineBoard";

export const dynamic = "force-dynamic";

// Migration cutoff — contacts created before this date are "legacy"
const LEGACY_CUTOFF = new Date("2026-02-21T00:00:00Z");

export default async function SubaccountPipelinesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;

  let stageGroups: Record<string, { id: string; businessName: string; phone: string; city: string | null; state: string | null; createdAt: Date }[]> = {
    NEW_LEAD: [],
    CONTACTED: [],
    REPLIED: [],
    QUALIFIED: [],
    BOOKED: [],
    CLOSED: [],
  };

  let legacyContacts: { id: string; businessName: string; phone: string; city: string | null; state: string | null; stage: string }[] = [];
  let totalLegacy = 0;
  let totalActive = 0;

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
        if (c.createdAt < LEGACY_CUTOFF) {
          legacyContacts.push({ id: c.id, businessName: c.businessName, phone: c.phone, city: c.city, state: c.state, stage: c.stage });
          totalLegacy++;
        } else {
          stageGroups[c.stage]?.push({ id: c.id, businessName: c.businessName, phone: c.phone, city: c.city, state: c.state, createdAt: c.createdAt });
          totalActive++;
        }
      }
    }
  } catch {
    // DB unavailable — show empty state
  }

  return (
    <PipelineBoard
      stageGroups={stageGroups}
      legacyContacts={legacyContacts}
      totalLegacy={totalLegacy}
      totalActive={totalActive}
    />
  );
}
