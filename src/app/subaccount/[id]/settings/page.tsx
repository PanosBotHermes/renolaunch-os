'use client';

import { Bell, MessageSquareText, Settings, Users } from "lucide-react";
import { EmptyState, FieldInput, FieldLabel, FieldSelect, PrimaryButton, SurfaceCard } from "@/components/prototype/primitives";
import { cn } from "@/lib/cn";
import type { ComponentType } from "react";
import { useState } from "react";

type TabId = "general" | "sms-numbers" | "team" | "notifications";

const tabs: Array<{ id: TabId; label: string; icon: ComponentType<{ size?: number }> }> = [
  { id: "general", label: "General", icon: Settings },
  { id: "sms-numbers", label: "SMS & Numbers", icon: MessageSquareText },
  { id: "team", label: "Team", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function SubaccountSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");

  return (
    <div className="space-y-6">
      <section className="glass-card flex gap-2 overflow-x-auto p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-pill px-4 text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-indigo-500/20 text-indigo-200 shadow-[0_0_20px_rgba(99,102,241,0.18)]"
                  : "text-reno-text-2 hover:bg-white/5 hover:text-reno-text-1",
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
          <h2 className="mb-5 text-base font-semibold text-reno-text-1">General Configuration</h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="account-name">Account Name</FieldLabel>
              <FieldInput id="account-name" placeholder="RenoLaunch" />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="business-phone">Primary Phone</FieldLabel>
              <FieldInput id="business-phone" placeholder="(775) 555-0190" />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="timezone">Timezone</FieldLabel>
              <FieldSelect id="timezone" defaultValue="">
                <option value="">Select timezone</option>
                <option value="pst">Pacific Time</option>
              </FieldSelect>
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="locale">Locale</FieldLabel>
              <FieldSelect id="locale" defaultValue="">
                <option value="">Select locale</option>
                <option value="en-us">en-US</option>
              </FieldSelect>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <PrimaryButton>Save Settings</PrimaryButton>
          </div>
        </SurfaceCard>
      ) : (
        <EmptyState
          title="Section ready"
          detail="This tab is available and prepared for subaccount configuration."
        />
      )}
    </div>
  );
}
