'use client';

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
  status: "New" | "Contacted" | "Replied" | "Qualified" | "Booked";
  added: string;
}

const scopedContacts: ContactRow[] = [
  {
    id: "contact-1",
    name: "Maya Santos",
    phone: "(775) 555-0188",
    city: "Reno",
    state: "NV",
    trade: "Roofing",
    status: "Booked",
    added: "2h ago",
  },
  {
    id: "contact-2",
    name: "Eli Turner",
    phone: "(702) 555-0142",
    city: "Las Vegas",
    state: "NV",
    trade: "Plumbing",
    status: "Replied",
    added: "5h ago",
  },
  {
    id: "contact-3",
    name: "Jordan Patel",
    phone: "(916) 555-0126",
    city: "Sacramento",
    state: "CA",
    trade: "HVAC",
    status: "Contacted",
    added: "1d ago",
  },
];

function tradeTone(trade: string): "accent" | "info" | "warning" {
  if (trade === "Roofing") return "accent";
  if (trade === "Plumbing") return "info";
  return "warning";
}

function statusTone(status: ContactRow["status"]): "success" | "info" | "warning" | "accent" {
  if (status === "Booked") return "success";
  if (status === "Replied") return "info";
  if (status === "Qualified") return "accent";
  return "warning";
}

export default function SubaccountContactsPage() {
  const [selectedContact, setSelectedContact] = useState<ContactRow | null>(null);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-reno-text-1">Contacts</h2>
        <p className="text-sm text-reno-text-2">Subaccount-level contact and pipeline management</p>
      </section>

      <SurfaceCard className="p-4">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-2" />
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

      <SurfaceCard className="overflow-hidden">
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-[rgba(8,13,24,0.88)] text-left text-xs uppercase tracking-[0.08em] text-reno-text-3">
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
                  className="cursor-pointer border-t border-white/6 transition-colors hover:bg-white/[0.03]"
                  onClick={() => setSelectedContact(contact)}
                >
                  <td className="px-5 py-3 font-medium text-reno-text-1">{contact.name}</td>
                  <td className="num-tabular px-5 py-3 text-reno-text-2">{contact.phone}</td>
                  <td className="px-5 py-3 text-reno-text-2">{contact.city}</td>
                  <td className="px-5 py-3 text-reno-text-2">{contact.state}</td>
                  <td className="px-5 py-3">
                    <StatusBadge tone={tradeTone(contact.trade)}>{contact.trade}</StatusBadge>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge tone={statusTone(contact.status)}>{contact.status}</StatusBadge>
                  </td>
                  <td className="px-5 py-3 text-reno-text-2">{contact.added}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-4 md:hidden">
          {scopedContacts.map((contact) => (
            <button
              key={`${contact.id}-mobile`}
              type="button"
              onClick={() => setSelectedContact(contact)}
              className="glass-card block w-full p-4 text-left"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="font-semibold text-reno-text-1">{contact.name}</p>
                <StatusBadge tone={statusTone(contact.status)}>{contact.status}</StatusBadge>
              </div>
              <p className="num-tabular text-sm text-reno-text-2">{contact.phone}</p>
              <div className="mt-3 flex items-center gap-2">
                <StatusBadge tone={tradeTone(contact.trade)}>{contact.trade}</StatusBadge>
                <p className="text-sm text-reno-text-3">
                  {contact.city}, {contact.state}
                </p>
              </div>
            </button>
          ))}
        </div>
      </SurfaceCard>

      {selectedContact ? (
        <>
          <button
            type="button"
            aria-label="Close contact panel"
            onClick={() => setSelectedContact(null)}
            className="fixed inset-0 top-[60px] z-40 bg-black/40"
          />

          <aside className="glass-card fixed bottom-0 right-0 top-[60px] z-50 w-full max-w-md rounded-none rounded-l-card border-l border-white/10 p-5 shadow-2xl shadow-black/40">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-reno-text-1">{selectedContact.name}</h3>
                <p className="text-sm text-reno-text-2">Contact details and stage controls</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedContact(null)}
                className="btn-secondary inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-reno-text-2 hover:text-reno-text-1"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <FieldSelect id="status" defaultValue={selectedContact.status.toLowerCase()}>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="replied">Replied</option>
                  <option value="qualified">Qualified</option>
                  <option value="booked">Booked</option>
                </FieldSelect>
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor="pipeline-stage">Pipeline Stage</FieldLabel>
                <FieldSelect id="pipeline-stage" defaultValue="contacted">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="replied">Replied</option>
                  <option value="qualified">Qualified</option>
                  <option value="booked">Booked</option>
                  <option value="closed">Closed</option>
                </FieldSelect>
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor="notes">Notes</FieldLabel>
                <FieldTextArea id="notes" rows={6} placeholder="Add notes..." />
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
