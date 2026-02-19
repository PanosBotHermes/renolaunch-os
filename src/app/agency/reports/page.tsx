'use client';
import { BarChart3, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { EmptyState, StatCard, SurfaceCard } from "@/components/prototype/primitives";

export default function AgencyReportsPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Leads" value="0" icon={Users} tone="accent" />
        <StatCard title="Reply Trend" value="0%" icon={TrendingUp} tone="success" />
        <StatCard title="Conversion" value="0%" icon={BarChart3} tone="warning" />
        <StatCard title="Compliance" value="0" icon={ShieldCheck} tone="error" />
      </section>

      <SurfaceCard className="p-5">
        <h2 className="mb-4 text-base font-semibold text-reno-text-primary">Performance Timeline</h2>
        <div className="h-72 rounded-card border border-reno-border bg-gradient-to-b from-reno-card to-reno-bg p-6">
          <div className="flex h-full items-end gap-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="flex-1 rounded-t-md bg-reno-border/70" style={{ height: `${18 + (index % 3) * 10}%` }} />
            ))}
          </div>
        </div>
      </SurfaceCard>

      <section className="grid gap-4 xl:grid-cols-2">
        <SurfaceCard className="overflow-hidden">
          <div className="border-b border-reno-border px-5 py-4">
            <h3 className="text-sm font-semibold text-reno-text-primary">Client Performance</h3>
          </div>
          <div className="p-5">
            <EmptyState
              title="No report rows"
              detail="Generate reporting data from active outreach campaigns."
            />
          </div>
        </SurfaceCard>

        <SurfaceCard className="overflow-hidden">
          <div className="border-b border-reno-border px-5 py-4">
            <h3 className="text-sm font-semibold text-reno-text-primary">Channel Breakdown</h3>
          </div>
          <div className="p-5">
            <EmptyState
              title="No channel metrics"
              detail="Metrics will populate as channels begin receiving traffic."
            />
          </div>
        </SurfaceCard>
      </section>
    </div>
  );
}
