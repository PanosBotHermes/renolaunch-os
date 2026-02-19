'use client';
"use client";

import { Search, SendHorizontal } from "lucide-react";
import { useState } from "react";
import { FieldInput, PrimaryButton, SurfaceCard } from "@/components/prototype/primitives";
import { cn } from "@/lib/cn";

type InboxTab = "all" | "unread" | "ai";

export default function SubaccountInboxPage() {
  const [activeTab, setActiveTab] = useState<InboxTab>("all");
  const [aiHandling, setAiHandling] = useState(false);

  return (
    <div className="h-[calc(100vh-7rem)] overflow-hidden rounded-card border border-reno-border bg-reno-card">
      <div className="flex h-full">
        <aside className="w-[360px] shrink-0 border-r border-reno-border bg-reno-bg/60">
          <div className="space-y-4 border-b border-reno-border p-4">
            <div className="relative">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-secondary" />
              <FieldInput aria-label="Search conversations" className="pl-9" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {([
                { id: "all", label: "All" },
                { id: "unread", label: "Unread" },
                { id: "ai", label: "AI" },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "h-9 rounded-input border text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "border-reno-accent bg-reno-accent/20 text-reno-accent"
                      : "border-reno-border bg-reno-card text-reno-text-secondary hover:text-reno-text-primary",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <div className="rounded-card border border-dashed border-reno-border bg-reno-bg/30 p-6 text-center">
              <p className="text-sm font-medium text-reno-text-primary">No conversations yet</p>
              <p className="mt-2 text-sm text-reno-text-secondary">
                New threads will appear here as SMS replies arrive.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-reno-border px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-reno-text-primary">Conversation Thread</h2>
              <p className="text-sm text-reno-text-secondary">No contact selected</p>
            </div>

            <button
              type="button"
              onClick={() => setAiHandling((current) => !current)}
              className="inline-flex items-center gap-2 rounded-input border border-reno-border bg-reno-bg px-3 py-2 text-sm"
            >
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  aiHandling ? "bg-reno-success" : "bg-reno-text-secondary",
                )}
              />
              AI Handling
            </button>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            <div className="max-w-lg rounded-card border border-reno-border bg-reno-bg px-4 py-3 text-sm text-reno-text-secondary">
              No inbound messages yet.
            </div>

            <div className="ml-auto max-w-lg rounded-card bg-reno-accent px-4 py-3 text-sm text-white">
              Send the first message to start this thread.
            </div>
          </div>

          <footer className="border-t border-reno-border p-4">
            <div className="flex gap-3">
              <FieldInput aria-label="Message input" className="flex-1" />
              <PrimaryButton>
                <SendHorizontal size={15} />
                Send
              </PrimaryButton>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
