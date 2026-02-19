'use client';
import { MessageSquareText, PhoneCall, SendHorizontal, ShieldCheck, UserPlus, Users } from "lucide-react";
import {
  EmptyState,
  PrimaryButton,
  SecondaryButton,
  StatCard,
  StatusBadge,
  SurfaceCard,
} from "@/components/prototype/primitives";

const stageConfig = [
  { label: "New Lead", tone: "bg-reno-accent/20 text-reno-accent" },
  { label: "Contacted", tone: "bg-sky-500/20 text-sky-300" },
  { label: "Replied", tone: "bg-emerald-500/20 text-emerald-300" },
  { label: "Qualified", tone: "bg-amber-500/20 text-amber-300" },
  { label: "Booked", tone: "bg-fuchsia-500/20 text-fuchsia-300" },
  { label: "Closed", tone: "bg-reno-success/20 text-reno-success" },
];

export default function SubaccountDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Open Leads" value="0" icon={Users} tone="accent" />
        <StatCard title="Unread Messages" value="0" icon={MessageSquareText} tone="warning" />
        <StatCard title="Booked Calls" value="0" icon={PhoneCall} tone="success" />
        <StatCard title="Compliance" value="0" icon={ShieldCheck} tone="error" />
      </section>

      <SurfaceCard className="p-5">
        <h2 className="mb-4 text-base font-semibold text-reno-text-primary">Pipeline Stages</h2>
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {stageConfig.map((stage) => (
            <div key={stage.label} className="rounded-card border border-reno-border bg-reno-bg/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-reno-text-primary">{stage.label}</span>
                <StatusBadge>0</StatusBadge>
              </div>
              <div className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${stage.tone}`}>
                Empty
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <SurfaceCard className="p-5">
          <h2 className="mb-4 text-base font-semibold text-reno-text-primary">Recent Conversations</h2>
          <EmptyState
            title="No conversations yet"
            detail="Inbound and outbound conversation updates will appear here."
          />
        </SurfaceCard>

        <SurfaceCard className="p-5">
          <h2 className="mb-4 text-base font-semibold text-reno-text-primary">Quick Actions</h2>
          <div className="space-y-3">
            <PrimaryButton className="w-full justify-center">
              <SendHorizontal size={15} />
              New SMS Blast
            </PrimaryButton>
            <SecondaryButton className="w-full justify-center">
              <UserPlus size={15} />
              Add Contact
            </SecondaryButton>
            <SecondaryButton className="w-full justify-center">
              <PhoneCall size={15} />
              Create Follow-up Task
            </SecondaryButton>
          </div>
        </SurfaceCard>
      </section>
    </div>
  );
}
