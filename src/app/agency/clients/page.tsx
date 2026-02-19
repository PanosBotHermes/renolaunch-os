'use client';

import Link from "next/link";
import { ArrowUpRight, Plus, Search } from "lucide-react";
import { FieldInput, PrimaryButton, StatusBadge, SurfaceCard } from "@/components/prototype/primitives";
import { subaccountOptions } from "@/lib/accounts";

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

const tradeTone = (trade: string): "accent" | "success" | "info" | "warning" => {
  if (trade === "Tree Service") return "success";
  if (trade === "Roofing") return "warning";
  if (trade === "Bathroom Remodeling") return "accent";
  return "info";
};

export default function AgencyClientsPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-reno-text-1">Client Accounts</h2>
          <p className="text-sm text-reno-text-2">{subaccountOptions.length} active accounts</p>
        </div>
        <PrimaryButton>
          <Plus size={16} />
          Add Client
        </PrimaryButton>
      </section>

      <SurfaceCard className="p-4">
        <div className="relative w-full">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-2" />
          <FieldInput aria-label="Search clients" className="w-full pl-9" placeholder="Search clients..." />
        </div>
      </SurfaceCard>

      <section className="grid gap-4 md:grid-cols-2">
        {subaccountOptions.map((client) => (
          <SurfaceCard
            key={client.id}
            className="group border-white/10 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-400/40"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-200">
                  {getInitials(client.name)}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-reno-text-1">{client.name}</h3>
                  <StatusBadge tone={tradeTone(client.trade)}>{client.trade}</StatusBadge>
                </div>
              </div>
              <StatusBadge tone="success">Active</StatusBadge>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-reno-text-2">Contacts</p>
                <p className="mt-1 font-semibold text-reno-text-1">—</p>
              </div>
              <div>
                <p className="text-xs text-reno-text-2">SMS Today</p>
                <p className="mt-1 font-semibold text-reno-text-1">—</p>
              </div>
              <div>
                <p className="text-xs text-reno-text-2">Reply Rate</p>
                <p className="mt-1 font-semibold text-reno-text-1">—</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/subaccount/${client.id}/dashboard`}
                className="btn-primary btn-press inline-flex flex-1 items-center justify-center gap-2 rounded-input px-4 py-2.5 text-sm font-medium text-white"
              >
                Open Account
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </SurfaceCard>
        ))}
      </section>
    </div>
  );
}
