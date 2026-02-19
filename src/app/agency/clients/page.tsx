'use client';
import { ArrowUpRight, Plus, Search } from "lucide-react";
import {
  EmptyState,
  FieldInput,
  PrimaryButton,
  ProgressBar,
  SecondaryButton,
  StatusBadge,
  SurfaceCard,
} from "@/components/prototype/primitives";

export default function AgencyClientsPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-reno-text-primary">Client Accounts</h2>
          <p className="text-sm text-reno-text-secondary">Agency-wide account visibility and health</p>
        </div>

        <PrimaryButton>
          <Plus size={15} />
          Add Client
        </PrimaryButton>
      </section>

      <SurfaceCard className="p-4">
        <div className="relative max-w-md">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-secondary" />
          <FieldInput aria-label="Search clients" className="pl-9" />
        </div>
      </SurfaceCard>

      <section className="grid gap-4 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <SurfaceCard key={index} className="p-5">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-reno-text-primary">Account Pending</h3>
                <p className="text-sm text-reno-text-secondary">Awaiting onboarding</p>
              </div>
              <StatusBadge tone="warning">Not Connected</StatusBadge>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-reno-text-secondary">Leads</p>
                <p className="mt-1 font-medium text-reno-text-primary">0</p>
              </div>
              <div>
                <p className="text-reno-text-secondary">SMS</p>
                <p className="mt-1 font-medium text-reno-text-primary">0</p>
              </div>
              <div>
                <p className="text-reno-text-secondary">Reply</p>
                <p className="mt-1 font-medium text-reno-text-primary">0%</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-reno-text-secondary">Health Score</span>
                <span className="text-reno-text-primary">0</span>
              </div>
              <ProgressBar value={0} />
            </div>

            <SecondaryButton className="w-full justify-center">
              Open Account
              <ArrowUpRight size={15} />
            </SecondaryButton>
          </SurfaceCard>
        ))}
      </section>

      <EmptyState
        title="No active clients connected"
        detail="Use Add Client to create a new client account in your agency workspace."
      />
    </div>
  );
}
