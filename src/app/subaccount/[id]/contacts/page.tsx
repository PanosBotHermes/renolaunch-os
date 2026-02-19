import { Filter, Search } from "lucide-react";
import {
  EmptyState,
  FieldInput,
  FieldSelect,
  SecondaryButton,
  SurfaceCard,
} from "@/components/prototype/primitives";
import { db } from "@/lib/db";
import { ContactsTableClient } from "./ContactsTableClient";
import type { ContactListItem } from "./types";

export const dynamic = "force-dynamic";

async function fetchContacts(slug: string): Promise<ContactListItem[]> {
  try {
    const subaccount = await db.subaccount.findUnique({ where: { slug }, select: { id: true } });
    if (!subaccount) return [];
    const contacts = await db.contact.findMany({
      where: { subaccountId: subaccount.id },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: { id: true, businessName: true, contactName: true, phone: true, city: true, state: true, trade: true, status: true, stage: true, createdAt: true },
    });
    return contacts.map(c => ({ ...c, createdAt: c.createdAt.toISOString() })) as ContactListItem[];
  } catch {
    return [];
  }
}

export default async function SubaccountContactsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const contacts = await fetchContacts(id);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-reno-text-1">Contacts</h2>
        <p className="text-sm text-reno-text-2">Subaccount-level contact and pipeline management</p>
      </section>

      <SurfaceCard className="p-4">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-2"
            />
            <FieldInput aria-label="Search contacts" className="pl-9" placeholder="Search contacts..." />
          </div>

          <FieldSelect aria-label="State filter" defaultValue="">
            <option value="">State</option>
            <option value="nv">Nevada</option>
            <option value="ca">California</option>
          </FieldSelect>

          <FieldSelect aria-label="Trade filter" defaultValue="">
            <option value="">Trade</option>
            <option value="roofing">Roofing</option>
            <option value="plumbing">Plumbing</option>
            <option value="hvac">HVAC</option>
          </FieldSelect>

          <FieldSelect aria-label="Status filter" defaultValue="">
            <option value="">Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="replied">Replied</option>
            <option value="qualified">Qualified</option>
            <option value="booked">Booked</option>
          </FieldSelect>

          <SecondaryButton className="w-full lg:w-auto">
            <Filter size={15} />
            Apply
          </SecondaryButton>
        </div>
      </SurfaceCard>

      {contacts.length > 0 ? (
        <ContactsTableClient contacts={contacts} />
      ) : (
        <SurfaceCard className="p-5">
          <EmptyState
            title="No contacts found"
            detail="This subaccount does not have contacts yet, or your current filters returned no results."
          />
        </SurfaceCard>
      )}
    </div>
  );
}
