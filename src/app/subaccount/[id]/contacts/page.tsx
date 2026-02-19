'use client';
"use client";

import { Filter, Search, SendHorizontal, X } from "lucide-react";
import { useState } from "react";
import {
  FieldInput,
  FieldLabel,
  FieldSelect,
  FieldTextArea,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
  SurfaceCard,
} from "@/components/prototype/primitives";

interface ContactRow {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  trade: string;
  status: string;
  added: string;
}

const scopedContacts: ContactRow[] = [
  {
    id: "contact-shell",
    name: "",
    phone: "",
    city: "",
    state: "",
    trade: "",
    status: "New",
    added: "",
  },
];

export default function SubaccountContactsPage() {
  const [selectedContact, setSelectedContact] = useState<ContactRow | null>(null);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold text-reno-text-primary">Contacts</h2>
        <p className="text-sm text-reno-text-secondary">Subaccount-level contact and pipeline management</p>
      </section>

      <SurfaceCard className="p-4">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-secondary" />
            <FieldInput aria-label="Search contacts" className="pl-9" />
          </div>

          <FieldSelect aria-label="State filter" defaultValue="">
            <option value="">State</option>
          </FieldSelect>

          <FieldSelect aria-label="Trade filter" defaultValue="">
            <option value="">Trade</option>
          </FieldSelect>

          <FieldSelect aria-label="Status filter" defaultValue="">
            <option value="">Status</option>
          </FieldSelect>

          <SecondaryButton className="w-full lg:w-auto">
            <Filter size={15} />
            Apply
          </SecondaryButton>
        </div>
      </SurfaceCard>

      <SurfaceCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-reno-bg/60 text-left text-xs uppercase tracking-wide text-reno-text-secondary">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">City</th>
                <th className="px-5 py-3 font-medium">State</th>
                <th className="px-5 py-3 font-medium">Trade</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Added</th>
              </tr>
            </thead>
            <tbody>
              {scopedContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="cursor-pointer border-t border-reno-border/70 transition-colors hover:bg-reno-card"
                  onClick={() => setSelectedContact(contact)}
                >
                  <td className="px-5 py-3 text-reno-text-primary">{contact.name || "Unassigned Contact"}</td>
                  <td className="px-5 py-3 text-reno-text-secondary">{contact.phone || "-"}</td>
                  <td className="px-5 py-3 text-reno-text-secondary">{contact.city || "-"}</td>
                  <td className="px-5 py-3 text-reno-text-secondary">{contact.state || "-"}</td>
                  <td className="px-5 py-3 text-reno-text-secondary">{contact.trade || "-"}</td>
                  <td className="px-5 py-3">
                    <StatusBadge tone="accent">{contact.status}</StatusBadge>
                  </td>
                  <td className="px-5 py-3 text-reno-text-secondary">{contact.added || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>

      {selectedContact ? (
        <>
          <button
            type="button"
            aria-label="Close contact panel"
            onClick={() => setSelectedContact(null)}
            className="fixed inset-0 top-[72px] z-40 bg-black/40"
          />

          <aside className="fixed bottom-0 right-0 top-[72px] z-50 w-full max-w-md border-l border-reno-border bg-reno-card p-6 shadow-2xl shadow-black/40">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-reno-text-primary">
                  {selectedContact.name || "Unassigned Contact"}
                </h3>
                <p className="text-sm text-reno-text-secondary">Contact details and stage controls</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="inline-flex size-8 items-center justify-center rounded-md border border-reno-border text-reno-text-secondary hover:text-reno-text-primary"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <FieldSelect id="status" defaultValue="new">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="replied">Replied</option>
                  <option value="qualified">Qualified</option>
                </FieldSelect>
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor="pipeline-stage">Pipeline Stage</FieldLabel>
                <FieldSelect id="pipeline-stage" defaultValue="new-lead">
                  <option value="new-lead">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="replied">Replied</option>
                  <option value="qualified">Qualified</option>
                  <option value="booked">Booked</option>
                  <option value="closed">Closed</option>
                </FieldSelect>
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor="notes">Notes</FieldLabel>
                <FieldTextArea id="notes" rows={6} />
              </div>

              <PrimaryButton className="w-full justify-center">
                <SendHorizontal size={15} />
                Send SMS
              </PrimaryButton>
            </div>
          </aside>
        </>
      ) : null}
    </div>
  );
}
