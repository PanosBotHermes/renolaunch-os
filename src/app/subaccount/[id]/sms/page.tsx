'use client';

import { ShieldCheck } from "lucide-react";
import { EmptyState, PrimaryButton, ProgressBar, StatusBadge, SurfaceCard } from "@/components/prototype/primitives";

export default function SubaccountSmsPage() {
  return (
    <div className="space-y-6">
      <SurfaceCard className="p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-reno-text-1">Active Campaign</h2>
            <p className="text-sm text-reno-text-2">Spring re-engagement campaign is running</p>
          </div>
          <StatusBadge tone="success">Active</StatusBadge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-reno-text-2">Progress</span>
            <span className="num-tabular text-reno-text-1">68%</span>
          </div>
          <ProgressBar value={68} />
        </div>
      </SurfaceCard>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-reno-text-1">Template Library</h2>
          <PrimaryButton>Create Template</PrimaryButton>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {["Reactivation Flow", "Quote Follow-up", "Booking Reminder"].map((template) => (
            <SurfaceCard key={template} className="p-5">
              <h3 className="text-sm font-semibold text-reno-text-1">{template}</h3>
              <p className="mt-2 text-sm text-reno-text-2">Ready-to-use messaging sequence for this subaccount.</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <SurfaceCard className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck size={16} className="text-indigo-300" />
          <h2 className="text-base font-semibold text-reno-text-1">A2P Status</h2>
        </div>

        <EmptyState
          title="Registration in review"
          detail="Your latest A2P submission is pending carrier approval."
        />
      </SurfaceCard>
    </div>
  );
}
