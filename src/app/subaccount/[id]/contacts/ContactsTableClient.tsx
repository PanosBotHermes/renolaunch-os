"use client";

import { useMemo, useState } from "react";
import { StatusBadge, SurfaceCard } from "@/components/prototype/primitives";
import { ContactDetailPanel } from "./ContactDetailPanel";
import type { ContactListItem } from "./types";

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function tradeTone(trade: string | null): "accent" | "info" | "warning" {
  if (!trade) return "warning";
  if (trade.toLowerCase().includes("tree") || trade.toLowerCase().includes("roof")) return "accent";
  if (trade.toLowerCase().includes("plumb") || trade.toLowerCase().includes("hvac")) return "info";
  return "warning";
}

function statusTone(status: ContactListItem["status"]): "success" | "info" | "warning" | "accent" | "error" {
  if (status === "BOOKED") return "success";
  if (status === "REPLIED") return "info";
  if (status === "QUALIFIED") return "accent";
  if (status === "DNC") return "error";
  return "warning";
}

function formatCreatedAt(value: string) {
  const createdAt = new Date(value);
  if (Number.isNaN(createdAt.getTime())) return "-";
  return createdAt.toLocaleDateString();
}

export function ContactsTableClient({ contacts }: { contacts: ContactListItem[] }) {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  const selectedContact = useMemo(
    () => contacts.find((contact) => contact.id === selectedContactId) ?? null,
    [contacts, selectedContactId],
  );

  return (
    <>
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
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="cursor-pointer border-t border-white/6 transition-colors hover:bg-white/[0.03]"
                  onClick={() => setSelectedContactId(contact.id)}
                >
                  <td className="px-5 py-3 font-medium text-reno-text-1">
                    {contact.contactName || contact.businessName}
                  </td>
                  <td className="num-tabular px-5 py-3 text-reno-text-2">{contact.phone}</td>
                  <td className="px-5 py-3 text-reno-text-2">{contact.city ?? "-"}</td>
                  <td className="px-5 py-3 text-reno-text-2">{contact.state ?? "-"}</td>
                  <td className="px-5 py-3">
                    <StatusBadge tone={tradeTone(contact.trade)}>{contact.trade ?? "Unknown"}</StatusBadge>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge tone={statusTone(contact.status)}>{toTitleCase(contact.status)}</StatusBadge>
                  </td>
                  <td className="px-5 py-3 text-reno-text-2">{formatCreatedAt(contact.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-4 md:hidden">
          {contacts.map((contact) => (
            <button
              key={`${contact.id}-mobile`}
              type="button"
              onClick={() => setSelectedContactId(contact.id)}
              className="glass-card block w-full p-4 text-left"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="font-semibold text-reno-text-1">{contact.contactName || contact.businessName}</p>
                <StatusBadge tone={statusTone(contact.status)}>{toTitleCase(contact.status)}</StatusBadge>
              </div>
              <p className="num-tabular text-sm text-reno-text-2">{contact.phone}</p>
              <div className="mt-3 flex items-center gap-2">
                <StatusBadge tone={tradeTone(contact.trade)}>{contact.trade ?? "Unknown"}</StatusBadge>
                <p className="text-sm text-reno-text-3">
                  {contact.city ?? "-"}, {contact.state ?? "-"}
                </p>
              </div>
              <p className="mt-2 text-xs text-reno-text-3">Stage: {toTitleCase(contact.stage)}</p>
            </button>
          ))}
        </div>
      </SurfaceCard>

      {selectedContact ? (
        <ContactDetailPanel
          contact={selectedContact}
          onClose={() => setSelectedContactId(null)}
        />
      ) : null}
    </>
  );
}
