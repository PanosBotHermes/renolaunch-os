'use client';

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Plus, Search } from "lucide-react";
import { FieldInput, PrimaryButton, StatusBadge, SurfaceCard } from "@/components/prototype/primitives";
import { AddClientDialog, type ClientAccount } from "./AddClientDialog";

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

const tradeTone = (trade: string | null): "accent" | "success" | "info" | "warning" => {
  if (!trade) return "info";
  if (trade === "Tree Service") return "success";
  if (trade === "Roofing") return "warning";
  if (trade === "Bathroom Remodeling") return "accent";
  return "info";
};

function statusTone(status: ClientAccount["status"]): "success" | "warning" | "error" {
  if (status === "ACTIVE") return "success";
  if (status === "PENDING") return "warning";
  return "error";
}

function statusLabel(status: ClientAccount["status"]) {
  if (status === "ACTIVE") return "Active";
  if (status === "PENDING") return "Pending";
  return "Inactive";
}

export default function AgencyClientsPage() {
  const [clients, setClients] = useState<ClientAccount[]>([]);
  const [search, setSearch] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  useEffect(() => {
    async function loadSubaccounts() {
      try {
        const response = await fetch("/api/subaccounts", { cache: "no-store" });
        if (!response.ok) return;
        const payload = (await response.json()) as unknown;
        if (Array.isArray(payload)) setClients(payload as ClientAccount[]);
      } catch {
        setClients([]);
      }
    }

    void loadSubaccounts();
  }, []);

  const filteredClients = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return clients;

    return clients.filter((client) => {
      return (
        client.name.toLowerCase().includes(needle) ||
        (client.trade ?? "").toLowerCase().includes(needle) ||
        client.slug.toLowerCase().includes(needle)
      );
    });
  }, [clients, search]);

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-reno-text-1">Client Accounts</h2>
          <p className="text-sm text-reno-text-2">{clients.length} active accounts</p>
        </div>
        <PrimaryButton onClick={() => setShowAddDialog(true)}>
          <Plus size={16} />
          Add Client
        </PrimaryButton>
      </section>

      <SurfaceCard className="p-4">
        <div className="relative w-full">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-2" />
          <FieldInput
            aria-label="Search clients"
            className="w-full pl-9"
            placeholder="Search clients..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </SurfaceCard>

      <section className="grid gap-4 md:grid-cols-2">
        {filteredClients.map((client) => (
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
                  <StatusBadge tone={tradeTone(client.trade)}>{client.trade ?? "Unknown"}</StatusBadge>
                </div>
              </div>
              <StatusBadge tone={statusTone(client.status)}>{statusLabel(client.status)}</StatusBadge>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-reno-text-2">Contacts</p>
                <p className="mt-1 font-semibold text-reno-text-1">{client._count.contacts}</p>
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
                href={`/subaccount/${client.slug}/dashboard`}
                className="btn-primary btn-press inline-flex flex-1 items-center justify-center gap-2 rounded-input px-4 py-2.5 text-sm font-medium text-white"
              >
                Open Account
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </SurfaceCard>
        ))}
      </section>

      {filteredClients.length === 0 ? (
        <SurfaceCard className="p-6 text-center text-sm text-reno-text-2">
          No clients match your search.
        </SurfaceCard>
      ) : null}

      <AddClientDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onCreated={(createdClient) => setClients((current) => [createdClient, ...current])}
      />
    </div>
  );
}
