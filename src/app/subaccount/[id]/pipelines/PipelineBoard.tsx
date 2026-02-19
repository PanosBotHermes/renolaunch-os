"use client";

import { useMemo, useState } from "react";
import { Building2 } from "lucide-react";
import { SurfaceCard } from "@/components/prototype/primitives";
import { cn } from "@/lib/cn";

const STAGE_CONFIG = [
  { key: "OLD", label: "Old Leads", color: "#94A3B8" },
  { key: "NEW_LEAD", label: "New Lead", color: "#6366F1" },
  { key: "CONTACTED", label: "Contacted", color: "#3B82F6" },
  { key: "REPLIED", label: "Replied", color: "#06B6D4" },
  { key: "QUALIFIED", label: "Qualified", color: "#F59E0B" },
  { key: "BOOKED", label: "Booked", color: "#22C55E" },
  { key: "CLOSED", label: "Closed", color: "#64748B" },
] as const;

interface ContactCard {
  id: string;
  businessName: string;
  phone: string;
  city: string | null;
  state: string | null;
  createdAt?: Date;
}

interface PipelineBoardProps {
  stageGroups: Record<string, ContactCard[]>;
  totalContacts: number;
}

export function PipelineBoard({
  stageGroups,
  totalContacts,
}: PipelineBoardProps) {
  const [selectedStageKey, setSelectedStageKey] = useState<typeof STAGE_CONFIG[number]["key"]>(STAGE_CONFIG[0].key);

  const selectedStage = useMemo(
    () => STAGE_CONFIG.find((s) => s.key === selectedStageKey) ?? STAGE_CONFIG[0],
    [selectedStageKey],
  );

  return (
    <div className="space-y-5 md:space-y-6">
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-reno-text-1">Pipeline Board</h2>
        <p className="text-sm text-reno-text-2">
          {totalContacts} lead{totalContacts !== 1 ? "s" : ""} tracked
        </p>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
        {STAGE_CONFIG.map((stage) => {
          const count = stageGroups[stage.key]?.length ?? 0;
          return (
            <button
              key={stage.key}
              type="button"
              onClick={() => setSelectedStageKey(stage.key)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-pill border px-3 text-sm font-medium transition-all",
                selectedStageKey === stage.key
                  ? "border-indigo-400/60 bg-indigo-500/20 text-indigo-200"
                  : "border-white/10 bg-white/[0.03] text-reno-text-2 hover:text-reno-text-1",
              )}
            >
              {stage.label}
              <span className="num-tabular rounded-full bg-white/10 px-2 py-0.5 text-xs">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="hidden overflow-x-auto pb-2 md:block">
        <div className="flex min-w-max gap-4">
          {STAGE_CONFIG.map((stage) => {
            const cards = stageGroups[stage.key] ?? [];
            return (
              <div key={stage.key} className="glass-card w-[280px] overflow-hidden rounded-b-card rounded-t-[0]">
                <div className="border-t-[3px] px-4 pb-4 pt-3" style={{ borderTopColor: stage.color }}>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-reno-text-1">{stage.label}</h3>
                    <span
                      className="num-tabular rounded-pill px-2 py-1 text-xs font-medium"
                      style={{ color: stage.color, background: `${stage.color}22`, border: `1px solid ${stage.color}44` }}
                    >
                      {cards.length}
                    </span>
                  </div>
                  <div className="max-h-[480px] space-y-3 overflow-y-auto">
                    {cards.length > 0 ? (
                      cards.map((card) => <PipelineCard key={card.id} card={card} />)
                    ) : (
                      <div className="rounded-card border border-dashed border-white/15 bg-white/[0.02] p-4 text-sm text-reno-text-2">
                        <div className="mb-2 flex items-center gap-2 text-reno-text-3">
                          <Building2 size={15} />
                          Empty stage
                        </div>
                        No leads here yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:hidden">
        <div className="glass-card overflow-hidden rounded-b-card rounded-t-[0]">
          <div className="border-t-[3px] px-4 pb-4 pt-3" style={{ borderTopColor: selectedStage.color }}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-reno-text-1">{selectedStage.label}</h3>
              <span
                className="num-tabular rounded-pill px-2 py-1 text-xs font-medium"
                style={{ color: selectedStage.color, background: `${selectedStage.color}22`, border: `1px solid ${selectedStage.color}44` }}
              >
                {stageGroups[selectedStage.key]?.length ?? 0}
              </span>
            </div>
            <div className="space-y-3">
              {(stageGroups[selectedStage.key] ?? []).length > 0 ? (
                (stageGroups[selectedStage.key] ?? []).map((card) => <PipelineCard key={card.id} card={card} />)
              ) : (
                <div className="rounded-card border border-dashed border-white/15 bg-white/[0.02] p-5 text-center text-sm text-reno-text-2">
                  <Building2 size={18} className="mx-auto mb-2 text-reno-text-3" />
                  No leads in this stage.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelineCard({ card }: { card: ContactCard }) {
  return (
    <SurfaceCard className="border-white/12 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/40">
      <p className="font-semibold text-reno-text-1">{card.businessName}</p>
      <p className="mt-0.5 text-sm text-reno-text-2">{card.phone}</p>
      {(card.city || card.state) && (
        <p className="mt-0.5 text-xs text-reno-text-3">
          {[card.city, card.state].filter(Boolean).join(", ")}
        </p>
      )}
    </SurfaceCard>
  );
}
