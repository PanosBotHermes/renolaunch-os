'use client';
import { Activity, ArrowUpRight, Building2, MessageSquareText, Percent, ShieldCheck } from "lucide-react";
import { EmptyState, ProgressBar, SecondaryButton, StatCard, StatusBadge, SurfaceCard } from "@/components/prototype/primitives";

export default function AgencyDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active Clients" value="0" icon={Building2} tone="accent" />
        <StatCard title="Leads Tracked" value="0" icon={MessageSquareText} tone="success" />
        <StatCard title="Reply Rate" value="0%" icon={Percent} tone="warning" />
        <StatCard title="Account Health" value="0" icon={ShieldCheck} tone="error" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <SurfaceCard className="overflow-hidden">
          <div className="border-b border-reno-border px-5 py-4">
            <h2 className="text-base font-semibold text-reno-text-primary">Client Performance</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-reno-bg/60 text-left text-xs uppercase tracking-wide text-reno-text-secondary">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Leads</th>
                  <th className="px-5 py-3 font-medium">SMS Today</th>
                  <th className="px-5 py-3 font-medium">Reply Rate</th>
                  <th className="px-5 py-3 font-medium">Health Score</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} className="px-5 py-12">
                    <EmptyState
                      title="No client data yet"
                      detail="Connect your first client account to unlock this table."
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </SurfaceCard>

        <SurfaceCard className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-reno-text-primary">Recent Activity</h2>
            <Activity size={16} className="text-reno-text-secondary" />
          </div>

          <div className="space-y-4">
            <div className="rounded-card border border-reno-border bg-reno-bg/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <StatusBadge>Awaiting Events</StatusBadge>
                <span className="text-xs text-reno-text-secondary">Now</span>
              </div>
              <p className="text-sm text-reno-text-secondary">
                Activity will appear after client campaigns and lead actions begin.
              </p>
              <div className="mt-4">
                <ProgressBar value={0} />
              </div>
            </div>

            <SecondaryButton className="w-full justify-center">
              View Full Activity Log
              <ArrowUpRight size={15} />
            </SecondaryButton>
          </div>
        </SurfaceCard>
      </section>
    </div>
  );
}
