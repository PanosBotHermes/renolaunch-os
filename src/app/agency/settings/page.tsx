'use client';
"use client";

import { CreditCard, Settings, ShieldCheck, Users } from "lucide-react";
import {
  EmptyState,
  FieldInput,
  FieldLabel,
  FieldSelect,
  PrimaryButton,
  SurfaceCard,
} from "@/components/prototype/primitives";
import { cn } from "@/lib/cn";
import type { ComponentType } from "react";
import { useState } from "react";

type TabId = "general" | "team" | "a2p" | "billing";

const tabs: Array<{ id: TabId; label: string; icon: ComponentType<{ size?: number }> }> = [
  { id: "general", label: "General", icon: Settings },
  { id: "team", label: "Team", icon: Users },
  { id: "a2p", label: "A2P Registrations", icon: ShieldCheck },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function AgencySettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");

  return (
    <div className="space-y-6">
      <section className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-input border px-4 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "border-reno-accent bg-reno-accent/20 text-reno-accent"
                  : "border-reno-border bg-reno-card text-reno-text-secondary hover:text-reno-text-primary",
              )}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </section>

      {activeTab === "general" ? (
        <SurfaceCard className="p-6">
          <h2 className="mb-5 text-base font-semibold text-reno-text-primary">General Settings</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="agency-name">Agency Name</FieldLabel>
              <FieldInput id="agency-name" />
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="agency-domain">Primary Domain</FieldLabel>
              <FieldInput id="agency-domain" />
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="timezone">Timezone</FieldLabel>
              <FieldSelect id="timezone" defaultValue="">
                <option value="">Select</option>
              </FieldSelect>
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="currency">Currency</FieldLabel>
              <FieldSelect id="currency" defaultValue="">
                <option value="">Select</option>
              </FieldSelect>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <PrimaryButton>Save Changes</PrimaryButton>
          </div>
        </SurfaceCard>
      ) : (
        <EmptyState
          title="Section ready"
          detail="This tab is scaffolded and ready for configuration workflows."
        />
      )}
    </div>
  );
}
