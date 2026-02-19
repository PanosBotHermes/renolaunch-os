export const dynamic = 'force-dynamic';
import Link from "next/link";
import { ArrowUpRight, Plus, Search, Settings2 } from "lucide-react";
import { EmptyState, FieldInput, ProgressBar, PrimaryButton, StatusBadge, SurfaceCard } from "@/components/prototype/primitives";
import { fetchFromApi } from "@/lib/server-api";

interface SubaccountCard {
  id: string;
  name: string;
  slug: string;
  trade: string | null;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  healthScore: number;
  dailyLimit: number;
  plan: "BASIC" | "PRO" | "AGENCY";
  _count: {
    contacts: number;
  };
}

function statusTone(status: SubaccountCard["status"]): "success" | "warning" | "error" {
  if (status === "ACTIVE") return "success";
  if (status === "PENDING") return "warning";
  return "error";
}

export default async function AgencyClientsPage() {
  const clients = (await fetchFromApi<SubaccountCard[]>("/api/subaccounts")) ?? [];

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

      {clients.length === 0 ? (
        <SurfaceCard className="p-5">
          <EmptyState
            title="No client accounts available"
            detail="Seed or create subaccounts to render client cards in this view."
          />
        </SurfaceCard>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {clients.map((client) => (
            <SurfaceCard
              key={client.id}
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
                    <p className="text-sm text-reno-text-2">{client.trade ?? "No trade configured"}</p>
                  </div>
                </div>
                <StatusBadge tone={statusTone(client.status)}>{client.status}</StatusBadge>
              </div>

              <div className="mb-4 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-sm text-reno-text-2">Contacts</p>
                  <p className="num-tabular mt-1 font-semibold text-reno-text-1">{client._count.contacts}</p>
                </div>
                <div>
                  <p className="text-sm text-reno-text-2">Daily Limit</p>
                  <p className="num-tabular mt-1 font-semibold text-reno-text-1">{client.dailyLimit}</p>
                </div>
                <div>
                  <p className="text-sm text-reno-text-2">Plan</p>
                  <p className="num-tabular mt-1 font-semibold text-reno-text-1">{client.plan}</p>
                </div>
              </div>

              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-reno-text-2">Health score</span>
                  <span className="num-tabular font-semibold text-reno-text-1">{client.healthScore}</span>
                </div>
                <ProgressBar value={client.healthScore} />
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/subaccount/${client.slug}/dashboard`}
                  className="btn-primary btn-press inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-input px-4 text-sm font-medium text-white transition-all"
                >
                  Open Account
                  <ArrowUpRight size={15} />
                </Link>
                <button
                  type="button"
                  aria-label={`Open ${client.name} settings`}
                  className="btn-secondary inline-flex h-11 w-11 items-center justify-center rounded-[10px] px-0"
                >
                  <Settings2 size={16} />
                </button>
              </div>
            </SurfaceCard>
          ))}
        </section>
      )}
    </div>
  );
}
