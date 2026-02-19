'use client';
import { ShieldCheck } from "lucide-react";
import {
  EmptyState,
  PrimaryButton,
  ProgressBar,
  StatusBadge,
  SurfaceCard,
} from "@/components/prototype/primitives";

export default function SubaccountSmsPage() {
  return (
    <div className="space-y-6">
      <SurfaceCard className="p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-reno-text-primary">Active Campaign</h2>
            <p className="text-sm text-reno-text-secondary">Campaign engine is currently idle</p>
          </div>
          <StatusBadge tone="warning">Not Started</StatusBadge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-reno-text-secondary">Progress</span>
            <span className="text-reno-text-primary">0%</span>
          </div>
          <ProgressBar value={0} />
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
              <h3 className="text-sm font-semibold text-reno-text-primary">Template Slot</h3>
              <p className="mt-2 text-sm text-reno-text-secondary">No template saved for this slot.</p>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <SurfaceCard className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck size={16} className="text-reno-accent" />
          <h2 className="text-base font-semibold text-reno-text-primary">A2P Status</h2>
        </div>

        <EmptyState
          title="Registration required"
          detail="Complete A2P registration to unlock production SMS sending."
        />
      </SurfaceCard>
    </div>
  );
}
