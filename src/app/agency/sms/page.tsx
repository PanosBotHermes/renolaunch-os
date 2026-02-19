'use client';
import { Megaphone, MessageCircle, SendHorizontal, Zap } from "lucide-react";
import {
  EmptyState,
  PrimaryButton,
  StatCard,
  StatusBadge,
  SurfaceCard,
} from "@/components/prototype/primitives";

export default function AgencySmsPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Active Campaigns" value="0" icon={Megaphone} tone="accent" />
        <StatCard title="Messages Sent" value="0" icon={SendHorizontal} tone="success" />
        <StatCard title="Replies" value="0" icon={MessageCircle} tone="warning" />
        <StatCard title="Automation Health" value="0" icon={Zap} tone="error" />
      </section>

      <SurfaceCard className="overflow-hidden">
        <div className="border-b border-reno-border px-5 py-4">
          <h2 className="text-base font-semibold text-reno-text-primary">Active Campaigns</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-reno-bg/60 text-left text-xs uppercase tracking-wide text-reno-text-secondary">
              <tr>
                <th className="px-5 py-3 font-medium">Campaign</th>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Sent</th>
                <th className="px-5 py-3 font-medium">Replies</th>
                <th className="px-5 py-3 font-medium">Reply Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="px-5 py-12">
                  <EmptyState
                    title="No active campaigns"
                    detail="Create or launch a campaign to start SMS outreach."
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </SurfaceCard>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-reno-text-primary">Template Library</h2>
          <PrimaryButton>Create Template</PrimaryButton>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <SurfaceCard key={index} className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-reno-text-primary">Draft Template</h3>
                <StatusBadge tone="default">Empty</StatusBadge>
              </div>
              <p className="text-sm text-reno-text-secondary">No body content has been saved yet.</p>
            </SurfaceCard>
          ))}
        </div>
      </section>
    </div>
  );
}
