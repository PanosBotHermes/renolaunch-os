'use client';

import { Filter, Search } from "lucide-react";
import { FieldInput, FieldSelect, SecondaryButton, StatusBadge, SurfaceCard } from "@/components/prototype/primitives";

const contacts = [
  { name: "Maya Santos", phone: "(775) 555-0188", city: "Reno", state: "NV", trade: "Roofing", status: "Booked", added: "2h ago" },
  { name: "Eli Turner", phone: "(702) 555-0142", city: "Las Vegas", state: "NV", trade: "Plumbing", status: "Replied", added: "5h ago" },
  { name: "Jordan Patel", phone: "(916) 555-0126", city: "Sacramento", state: "CA", trade: "HVAC", status: "Contacted", added: "1d ago" },
];

function tradeTone(trade: string): "info" | "warning" | "accent" {
  if (trade === "Roofing") return "accent";
  if (trade === "Plumbing") return "info";
  return "warning";
}

function statusTone(status: string): "success" | "info" | "warning" {
  if (status === "Booked") return "success";
  if (status === "Replied") return "info";
  return "warning";
}

export default function AgencyContactsPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-reno-text-1">Contacts</h2>
        <p className="text-sm text-reno-text-2">Centralized contact index across all clients</p>
      </section>

      <SurfaceCard className="p-4">
        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-2" />
            <FieldInput aria-label="Search contacts" className="pl-9" placeholder="Search contacts..." />
          </div>

          <FieldSelect aria-label="Filter by state" defaultValue="">
            <option value="">State</option>
            <option value="nv">Nevada</option>
            <option value="ca">California</option>
          </FieldSelect>

          <FieldSelect aria-label="Filter by trade" defaultValue="">
            <option value="">Trade</option>
            <option value="roofing">Roofing</option>
            <option value="plumbing">Plumbing</option>
            <option value="hvac">HVAC</option>
          </FieldSelect>

          <FieldSelect aria-label="Filter by status" defaultValue="">
            <option value="">Status</option>
            <option value="contacted">Contacted</option>
            <option value="replied">Replied</option>
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
              {contacts.map((contact) => (
                <tr key={contact.phone} className="border-t border-white/6 bg-transparent transition-colors hover:bg-white/[0.03]">
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
          {contacts.map((contact) => (
            <div key={`${contact.phone}-mobile`} className="glass-card p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="font-semibold text-reno-text-1">{contact.name}</p>
                <StatusBadge tone={statusTone(contact.status)}>{contact.status}</StatusBadge>
              </div>
              <p className="num-tabular text-sm text-reno-text-2">{contact.phone}</p>
              <div className="mt-3 flex items-center gap-2">
                <StatusBadge tone={tradeTone(contact.trade)}>{contact.trade}</StatusBadge>
                <p className="text-sm text-reno-text-3">
                  {contact.city}, {contact.state} • {contact.added}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}
