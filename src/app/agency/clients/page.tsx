'use client';

import { ArrowUpRight, Plus, Search, Settings2 } from "lucide-react";
import { FieldInput, PrimaryButton, ProgressBar, SecondaryButton, StatusBadge, SurfaceCard } from "@/components/prototype/primitives";

const clients = [
  { name: "Sunline Roofing", status: "Connected", statusTone: "success" as const, leads: 148, sms: 389, reply: "31%", health: 92 },
  { name: "Rivera Plumbing", status: "Monitoring", statusTone: "warning" as const, leads: 82, sms: 226, reply: "22%", health: 74 },
  { name: "NorthPeak HVAC", status: "Needs Setup", statusTone: "error" as const, leads: 31, sms: 90, reply: "14%", health: 48 },
];

export default function AgencyClientsPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-reno-text-1">Client Accounts</h2>
          <p className="text-sm text-reno-text-2">Agency-wide account visibility and health</p>
        </div>

        <PrimaryButton>
          <Plus size={16} />
          Add Client
        </PrimaryButton>
      </section>

      <SurfaceCard className="p-4">
        <div className="relative w-full">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-2" />
          <FieldInput aria-label="Search clients" className="w-full pl-9" placeholder="Search by client name, city, or trade..." />
        </div>
      </SurfaceCard>

      <section className="grid gap-4 md:grid-cols-2">
        {clients.map((client) => (
          <SurfaceCard
            key={client.name}
            className="group border-white/10 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-400/40"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-sm font-semibold text-reno-text-1">
                  {client.name
                    .split(" ")
                    .map((segment) => segment[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-reno-text-1">{client.name}</h3>
                  <p className="text-sm text-reno-text-2">Onboarding complete</p>
                </div>
              </div>
              <StatusBadge tone={client.statusTone}>{client.status}</StatusBadge>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-3">
              <div>
                <p className="text-sm text-reno-text-2">Leads</p>
                <p className="num-tabular mt-1 font-semibold text-reno-text-1">{client.leads}</p>
              </div>
              <div>
                <p className="text-sm text-reno-text-2">SMS</p>
                <p className="num-tabular mt-1 font-semibold text-reno-text-1">{client.sms}</p>
              </div>
              <div>
                <p className="text-sm text-reno-text-2">Reply</p>
                <p className="num-tabular mt-1 font-semibold text-reno-text-1">{client.reply}</p>
              </div>
            </div>

            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-reno-text-2">Health score</span>
                <span className="num-tabular font-semibold text-reno-text-1">{client.health}</span>
              </div>
              <ProgressBar value={client.health} />
            </div>

            <div className="flex items-center gap-2">
              <PrimaryButton className="flex-1 justify-center">
                Open Account
                <ArrowUpRight size={15} />
              </PrimaryButton>
              <SecondaryButton aria-label={`Open ${client.name} settings`} className="h-11 w-11 px-0">
                <Settings2 size={16} />
              </SecondaryButton>
            </div>
          </SurfaceCard>
        ))}
      </section>
    </div>
  );
}
