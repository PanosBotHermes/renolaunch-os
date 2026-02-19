import { Filter, Search } from "lucide-react";
import { EmptyState, FieldInput, FieldSelect, SecondaryButton, SurfaceCard } from "@/components/prototype/primitives";
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
      select: { id:true, businessName:true, contactName:true, phone:true, city:true, state:true, trade:true, status:true, stage:true, createdAt:true },
    });
    return contacts.map(c => ({ ...c, createdAt: c.createdAt.toISOString() })) as ContactListItem[];
  } catch {
    return [];
  }
}

export default async function SubaccountContactsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const contacts = await fetchContacts(id);
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-reno-text-1">Contacts</h2>
        <p className="text-sm text-reno-text-2">{contacts.length} contacts in this account</p>
      </section>
      <SurfaceCard className="p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-2" />
            <FieldInput aria-label="Search contacts" className="w-full pl-9" placeholder="Search contacts..." />
          </div>
          <SecondaryButton><Filter size={15} />Filter</SecondaryButton>
        </div>
      </SurfaceCard>
      {contacts.length > 0 ? (
        <ContactsTableClient contacts={contacts} />
      ) : (
        <SurfaceCard className="p-5">
          <EmptyState title="No contacts yet" detail="Contacts migrated from GHL will appear here." />
        </SurfaceCard>
      )}
    </div>
  );
}
