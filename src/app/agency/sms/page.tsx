'use client';

import { Megaphone, MessageCircle, SendHorizontal, Zap } from "lucide-react";
import { PrimaryButton, StatCard, StatusBadge, SurfaceCard } from "@/components/prototype/primitives";

const campaigns = [
  { name: "Spring Re-engagement", client: "Sunline Roofing", status: "Active", sent: 420, replies: 103, rate: "24.5%" },
  { name: "Estimate Follow-up", client: "Rivera Plumbing", status: "Warming", sent: 188, replies: 34, rate: "18.1%" },
];

export default function AgencySmsPage() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
        <StatCard title="Active Campaigns" value="8" icon={<Megaphone size={18} />} tone="accent" trend="+3" />
        <StatCard title="Messages Sent" value="18,342" icon={<SendHorizontal size={18} />} tone="success" trend="+11%" />
        <StatCard title="Replies" value="2,491" icon={<MessageCircle size={18} />} tone="warning" trend="+6%" />
        <StatCard title="Automation Health" value="96%" icon={<Zap size={18} />} tone="accent" trend="+1.2%" />
      </section>

      <SurfaceCard className="overflow-hidden">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="text-base font-semibold text-reno-text-1">Active Campaigns</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-[rgba(8,13,24,0.88)] text-left text-xs uppercase tracking-[0.08em] text-reno-text-3">
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
              {campaigns.map((campaign) => (
                <tr key={campaign.name} className="border-t border-white/6 transition-colors hover:bg-white/[0.03]">
                  <td className="px-5 py-3 font-medium text-reno-text-1">{campaign.name}</td>
                  <td className="px-5 py-3 text-reno-text-2">{campaign.client}</td>
                  <td className="px-5 py-3">
                    <StatusBadge tone={campaign.status === "Active" ? "success" : "warning"}>{campaign.status}</StatusBadge>
                  </td>
                  <td className="num-tabular px-5 py-3 text-reno-text-2">{campaign.sent}</td>
                  <td className="num-tabular px-5 py-3 text-reno-text-2">{campaign.replies}</td>
                  <td className="num-tabular px-5 py-3 text-reno-text-2">{campaign.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-reno-text-1">Template Library</h2>
          <PrimaryButton>Create Template</PrimaryButton>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {["Quote Follow-up", "Missed Call Recovery", "Booking Reminder"].map((template) => (
            <SurfaceCard key={template} className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-reno-text-1">{template}</h3>
                <StatusBadge tone="accent">AI Optimized</StatusBadge>
              </div>
              <p className="text-sm text-reno-text-2">Short-form message flow ready to deploy to selected client campaigns.</p>
            </SurfaceCard>
          ))}
        </div>
      </section>
    </div>
  );
}
