'use client';

import { BarChart3, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { StatCard, StatusBadge, SurfaceCard } from "@/components/prototype/primitives";

const reportRows = [
  { client: "Sunline Roofing", leads: 148, booked: 23, conversion: "15.5%", compliance: "Passed" },
  { client: "Rivera Plumbing", leads: 82, booked: 11, conversion: "13.4%", compliance: "Warning" },
  { client: "NorthPeak HVAC", leads: 55, booked: 6, conversion: "10.9%", compliance: "Passed" },
];

export default function AgencyReportsPage() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
        <StatCard title="Total Leads" value="3,928" icon={Users} tone="accent" trend="+9.2%" />
        <StatCard title="Reply Trend" value="27%" icon={TrendingUp} tone="success" trend="+2.4%" />
        <StatCard title="Conversion" value="14.1%" icon={BarChart3} tone="warning" trend="+0.8%" />
        <StatCard title="Compliance" value="98%" icon={ShieldCheck} tone="accent" trend="+1.1%" />
      </section>

      <SurfaceCard className="p-5">
        <h3 className="mb-4 text-base font-semibold text-reno-text-1">Performance Timeline</h3>
        <div className="h-64 rounded-card border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-4">
          <div className="flex h-full items-end gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-[6px] bg-gradient-to-t from-indigo-500/50 to-violet-500/20"
                style={{ height: `${28 + (index % 6) * 9}%` }}
              />
            ))}
          </div>
        </div>
      </SurfaceCard>

      <SurfaceCard className="overflow-hidden">
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-[rgba(8,13,24,0.88)] text-left text-xs uppercase tracking-[0.08em] text-reno-text-3">
              <tr>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Leads</th>
                <th className="px-5 py-3 font-medium">Booked</th>
                <th className="px-5 py-3 font-medium">Conversion</th>
                <th className="px-5 py-3 font-medium">Compliance</th>
              </tr>
            </thead>
            <tbody>
              {reportRows.map((row) => (
                <tr key={row.client} className="border-t border-white/6 transition-colors hover:bg-white/[0.03]">
                  <td className="px-5 py-3 font-medium text-reno-text-1">{row.client}</td>
                  <td className="num-tabular px-5 py-3 text-reno-text-2">{row.leads}</td>
                  <td className="num-tabular px-5 py-3 text-reno-text-2">{row.booked}</td>
                  <td className="num-tabular px-5 py-3 text-reno-text-2">{row.conversion}</td>
                  <td className="px-5 py-3">
                    <StatusBadge tone={row.compliance === "Passed" ? "success" : "warning"}>{row.compliance}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-4 md:hidden">
          {reportRows.map((row) => (
            <div key={`${row.client}-mobile`} className="glass-card p-4">
              <p className="font-semibold text-reno-text-1">{row.client}</p>
              <div className="mt-2 grid grid-cols-3 gap-2 text-sm text-reno-text-2">
                <p>Leads <span className="num-tabular text-reno-text-1">{row.leads}</span></p>
                <p>Booked <span className="num-tabular text-reno-text-1">{row.booked}</span></p>
                <p>Conv <span className="num-tabular text-reno-text-1">{row.conversion}</span></p>
              </div>
              <div className="mt-3">
                <StatusBadge tone={row.compliance === "Passed" ? "success" : "warning"}>{row.compliance}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}
