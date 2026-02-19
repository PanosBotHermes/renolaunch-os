'use client';

import {
  Activity,
  ArrowUpRight,
  Building2,
  MessageSquareText,
  Percent,
  ShieldCheck,
  CircleCheckBig,
  BellRing,
  TriangleAlert,
} from "lucide-react";
import { SecondaryButton, StatCard, StatusBadge, SurfaceCard } from "@/components/prototype/primitives";

import { subaccountOptions } from "@/lib/accounts";

const clientRows = subaccountOptions.map((s) => ({ name: s.name, trade: s.trade, status: "Active", leads: "—", sms: "—", replyRate: "—", health: "—", tone: "success" as const }));


const activity = [
  {
    title: "Automation flow recovered",
    detail: "Raymundo Tree Service campaign resumed after temporary pause.",
    time: "3m ago",
    icon: CircleCheckBig,
    tone: "success" as const,
  },
  {
    title: "Reply spike detected",
    detail: "Created Bathrooms received 14 inbound replies in the last hour.",
    time: "18m ago",
    icon: BellRing,
    tone: "info" as const,
  },
  {
    title: "Compliance action required",
    detail: "Nations Best Roofing needs updated opt-in wording for A2P compliance.",
    time: "42m ago",
    icon: TriangleAlert,
    tone: "warning" as const,
  },
];

export default function AgencyDashboardPage() {
  const today = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date());

  return (
    <div className="space-y-6">
      <section className="glass-card p-5 md:p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-reno-text-1">Good morning, Panos 👋</h2>
        <p className="mt-2 text-sm text-reno-text-2">{today}</p>
      </section>

      <section className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
        <StatCard title="Active Clients" value="24" icon={Building2} tone="accent" trend="+8%" />
        <StatCard title="Leads Tracked" value="3,928" icon={MessageSquareText} tone="success" trend="+12%" />
        <StatCard title="Reply Rate" value="27%" icon={Percent} tone="warning" trend="+2.1%" trendDirection="up" />
        <StatCard title="Account Health" value="89" icon={ShieldCheck} tone="accent" trend="+4" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <SurfaceCard className="overflow-hidden">
          <div className="border-b border-white/10 px-5 py-4">
            <h3 className="text-base font-semibold text-reno-text-1">Clients</h3>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-[rgba(8,13,24,0.9)] text-left text-xs uppercase tracking-[0.08em] text-reno-text-3">
                <tr>
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Leads</th>
                  <th className="px-5 py-3 font-medium">SMS</th>
                  <th className="px-5 py-3 font-medium">Reply Rate</th>
                  <th className="px-5 py-3 font-medium">Health</th>
                </tr>
              </thead>
              <tbody>
                {clientRows.map((row) => (
                  <tr key={row.name} className="border-t border-white/6 transition-colors hover:bg-white/[0.03]">
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
                      <StatusBadge tone={row.tone}>{row.status}</StatusBadge>
                    </td>
                    <td className="num-tabular px-5 py-3 text-reno-text-2">{row.leads}</td>
                    <td className="num-tabular px-5 py-3 text-reno-text-2">{row.sms}</td>
                    <td className="num-tabular px-5 py-3 text-reno-text-2">{row.replyRate}</td>
                    <td className="num-tabular px-5 py-3 text-reno-text-1">{row.health}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {clientRows.map((row) => (
              <div key={`${row.name}-mobile`} className="glass-card p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="font-medium text-reno-text-1">{row.name}</p>
                  <StatusBadge tone={row.tone}>{row.status}</StatusBadge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <p className="text-reno-text-2">Leads <span className="num-tabular text-reno-text-1">{row.leads}</span></p>
                  <p className="text-reno-text-2">SMS <span className="num-tabular text-reno-text-1">{row.sms}</span></p>
                  <p className="text-reno-text-2">Reply <span className="num-tabular text-reno-text-1">{row.replyRate}</span></p>
                </div>
              </div>
            ))}
          </div>
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
