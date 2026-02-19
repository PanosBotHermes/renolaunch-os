import {
  Activity,
  ArrowUpRight,
  Building2,
  CircleCheckBig,
  MessageSquareText,
  Percent,
  ShieldCheck,
  TriangleAlert,
  BellRing,
} from "lucide-react";
import { EmptyState, SecondaryButton, StatCard, StatusBadge, SurfaceCard } from "@/components/prototype/primitives";
import { fetchFromApi } from "@/lib/server-api";

interface AgencyStats {
  totalSubaccounts: number;
  totalContacts: number;
  totalConversations: number;
  activeSubaccounts: number;
}

interface SubaccountRow {
  id: string;
  name: string;
  slug: string;
  trade: string | null;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  plan: "BASIC" | "PRO" | "AGENCY";
  healthScore: number;
  dailyLimit: number;
  _count: {
    contacts: number;
  };
}

const activity = [
  {
    title: "Automation flow recovered",
    detail: "Campaign throughput normalized after a temporary pause.",
    time: "3m ago",
    icon: CircleCheckBig,
    tone: "success" as const,
  },
  {
    title: "Reply spike detected",
    detail: "Inbound conversations increased in the last hour.",
    time: "18m ago",
    icon: BellRing,
    tone: "info" as const,
  },
  {
    title: "Compliance action required",
    detail: "One or more accounts need updated A2P registration details.",
    time: "42m ago",
    icon: TriangleAlert,
    tone: "warning" as const,
  },
];

function statusTone(status: SubaccountRow["status"]): "success" | "warning" | "error" {
  if (status === "ACTIVE") return "success";
  if (status === "PENDING") return "warning";
  return "error";
}

export default async function AgencyDashboardPage() {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const [stats, subaccounts] = await Promise.all([
    fetchFromApi<AgencyStats>("/api/stats/agency"),
    fetchFromApi<SubaccountRow[]>("/api/subaccounts"),
  ]);

  const statValues = stats ?? {
    totalSubaccounts: 0,
    totalContacts: 0,
    totalConversations: 0,
    activeSubaccounts: 0,
  };

  const clientRows = subaccounts ?? [];
  const accountHealth =
    clientRows.length > 0
      ? Math.round(clientRows.reduce((sum, account) => sum + account.healthScore, 0) / clientRows.length)
      : 0;
  const replyRate =
    statValues.totalContacts > 0
      ? `${Math.round((statValues.totalConversations / statValues.totalContacts) * 100)}%`
      : "0%";

  return (
    <div className="space-y-6">
      <section className="glass-card p-5 md:p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-reno-text-1">Good morning, Panos 👋</h2>
        <p className="mt-2 text-sm text-reno-text-2">{today}</p>
      </section>

      <section className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
        <StatCard
          title="Active Clients"
          value={statValues.activeSubaccounts.toLocaleString()}
          icon={Building2}
          tone="accent"
          trend={`${statValues.totalSubaccounts.toLocaleString()} total`}
          trendDirection="up"
        />
        <StatCard
          title="Leads Tracked"
          value={statValues.totalContacts.toLocaleString()}
          icon={MessageSquareText}
          tone="success"
          trend={`${statValues.totalConversations.toLocaleString()} convos`}
          trendDirection="up"
        />
        <StatCard title="Reply Rate" value={replyRate} icon={Percent} tone="warning" trend="Derived from active data" />
        <StatCard title="Account Health" value={accountHealth.toString()} icon={ShieldCheck} tone="accent" trend="Average score" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <SurfaceCard className="overflow-hidden">
          <div className="border-b border-white/10 px-5 py-4">
            <h3 className="text-base font-semibold text-reno-text-1">Clients</h3>
          </div>

          {clientRows.length === 0 ? (
            <div className="p-5">
              <EmptyState
                title="No subaccounts yet"
                detail="Create or seed subaccounts to populate agency client metrics."
              />
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-[rgba(8,13,24,0.9)] text-left text-xs uppercase tracking-[0.08em] text-reno-text-3">
                    <tr>
                      <th className="px-5 py-3 font-medium">Client</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Trade</th>
                      <th className="px-5 py-3 font-medium">Plan</th>
                      <th className="px-5 py-3 font-medium">Contacts</th>
                      <th className="px-5 py-3 font-medium">Health</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientRows.map((row) => (
                      <tr key={row.id} className="border-t border-white/6 transition-colors hover:bg-white/[0.03]">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/6 text-xs font-semibold text-reno-text-1">
                              {row.name
                                .split(" ")
                                .map((segment) => segment[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                            <span className="font-medium text-reno-text-1">{row.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <StatusBadge tone={statusTone(row.status)}>{row.status}</StatusBadge>
                        </td>
                        <td className="px-5 py-3 text-reno-text-2">{row.trade ?? "-"}</td>
                        <td className="px-5 py-3 text-reno-text-2">{row.plan}</td>
                        <td className="num-tabular px-5 py-3 text-reno-text-2">{row._count.contacts}</td>
                        <td className="num-tabular px-5 py-3 text-reno-text-1">{row.healthScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 p-4 md:hidden">
                {clientRows.map((row) => (
                  <div key={`${row.id}-mobile`} className="glass-card p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <p className="font-medium text-reno-text-1">{row.name}</p>
                      <StatusBadge tone={statusTone(row.status)}>{row.status}</StatusBadge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <p className="text-reno-text-2">
                        Contacts <span className="num-tabular text-reno-text-1">{row._count.contacts}</span>
                      </p>
                      <p className="text-reno-text-2">
                        Plan <span className="text-reno-text-1">{row.plan}</span>
                      </p>
                      <p className="text-reno-text-2">
                        Health <span className="num-tabular text-reno-text-1">{row.healthScore}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </SurfaceCard>

        <SurfaceCard className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-reno-text-1">Recent Activity</h3>
            <Activity size={17} className="text-reno-text-2" />
          </div>

          <div className="space-y-4">
            {activity.map((event) => {
              const Icon = event.icon;
              const toneClass =
                event.tone === "success"
                  ? "bg-emerald-500/15 text-emerald-300"
                  : event.tone === "warning"
                    ? "bg-amber-500/15 text-amber-300"
                    : "bg-sky-500/15 text-sky-300";

              return (
                <div key={event.title} className="relative pl-10">
                  <span className="absolute left-[15px] top-9 h-10 w-px bg-white/10 last:hidden" />
                  <span className={`absolute left-0 top-0 inline-flex h-8 w-8 items-center justify-center rounded-full ${toneClass}`}>
                    <Icon size={15} />
                  </span>
                  <p className="text-sm font-medium text-reno-text-1">{event.title}</p>
                  <p className="mt-1 text-sm text-reno-text-2">{event.detail}</p>
                  <p className="mt-1 text-sm text-reno-text-3">{event.time}</p>
                </div>
              );
            })}
          </div>

          <SecondaryButton className="mt-5 w-full justify-center">
            View Full Activity Log
            <ArrowUpRight size={15} />
          </SecondaryButton>
        </SurfaceCard>
      </section>
    </div>
  );
}
