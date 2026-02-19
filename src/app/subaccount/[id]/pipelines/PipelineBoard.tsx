"use client";

import { useMemo, useState } from "react";
import { Building2, ChevronDown, ChevronRight } from "lucide-react";
import { StatusBadge, SurfaceCard } from "@/components/prototype/primitives";
import { cn } from "@/lib/cn";

const STAGE_CONFIG = [
  { key: "NEW_LEAD",  label: "New Lead",   color: "#6366F1" },
  { key: "CONTACTED", label: "Contacted",  color: "#3B82F6" },
  { key: "REPLIED",   label: "Replied",    color: "#06B6D4" },
  { key: "QUALIFIED", label: "Qualified",  color: "#F59E0B" },
  { key: "BOOKED",    label: "Booked",     color: "#22C55E" },
  { key: "CLOSED",    label: "Closed",     color: "#64748B" },
] as const;

interface ContactCard {
  id: string;
  businessName: string;
  phone: string;
  city: string | null;
  state: string | null;
  createdAt?: Date;
}

interface LegacyContact {
  id: string;
  businessName: string;
  phone: string;
  city: string | null;
  state: string | null;
  stage: string;
}

interface PipelineBoardProps {
  stageGroups: Record<string, ContactCard[]>;
  legacyContacts: LegacyContact[];
  totalLegacy: number;
  totalActive: number;
}

const LEGACY_STAGE_LABELS: Record<string, string> = {
  NEW_LEAD: "New",
  CONTACTED: "Contacted",
  REPLIED: "Replied",
  QUALIFIED: "Qualified",
  BOOKED: "Booked",
  CLOSED: "Closed",
};

export function PipelineBoard({
  stageGroups,
  legacyContacts,
  totalLegacy,
  totalActive,
}: PipelineBoardProps) {
  const [selectedStageKey, setSelectedStageKey] = useState<typeof STAGE_CONFIG[number]["key"]>(STAGE_CONFIG[0].key);
  const [legacyOpen, setLegacyOpen] = useState(false);
  const [legacySearch, setLegacySearch] = useState("");

  const selectedStage = useMemo(
    () => STAGE_CONFIG.find((s) => s.key === selectedStageKey) ?? STAGE_CONFIG[0],
    [selectedStageKey],
  );

  const filteredLegacy = useMemo(() => {
    const needle = legacySearch.trim().toLowerCase();
    if (!needle) return legacyContacts;
    return legacyContacts.filter(
      (c) =>
        c.businessName.toLowerCase().includes(needle) ||
        c.phone.includes(needle) ||
        (c.city ?? "").toLowerCase().includes(needle),
    );
  }, [legacyContacts, legacySearch]);

  return (
    <div className="space-y-5 md:space-y-6">
      {/* Page header */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-reno-text-1">Pipeline Board</h2>
        <p className="text-sm text-reno-text-2">
          {totalActive} active lead{totalActive !== 1 ? "s" : ""} · {totalLegacy} imported
        </p>
      </section>

      {/* Active pipeline ─ mobile column switcher */}
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

      {/* Active pipeline ─ desktop Kanban */}
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

      {/* Active pipeline ─ mobile single column */}
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

      {/* Legacy / Imported Leads section */}
      {totalLegacy > 0 && (
        <div className="glass-card overflow-hidden">
          {/* Header — toggle */}
          <button
            type="button"
            onClick={() => setLegacyOpen((o) => !o)}
            className="flex w-full items-center justify-between gap-3 border-b border-white/10 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-amber-500/20 text-amber-300">
                <Building2 size={14} />
              </span>
              <div>
                <p className="text-sm font-semibold text-reno-text-1">
                  Imported Leads
                  <span className="ml-2 inline-flex items-center rounded-pill border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-300">
                    {totalLegacy}
                  </span>
                </p>
                <p className="text-xs text-reno-text-3">Migrated from GHL before outreach begins</p>
              </div>
            </div>
            {legacyOpen ? (
              <ChevronDown size={16} className="shrink-0 text-reno-text-2" />
            ) : (
              <ChevronRight size={16} className="shrink-0 text-reno-text-2" />
            )}
          </button>

          {legacyOpen && (
            <div className="p-4">
              {/* Search */}
              <input
                type="text"
                placeholder="Search imported leads..."
                value={legacySearch}
                onChange={(e) => setLegacySearch(e.target.value)}
                className="mb-4 h-10 w-full rounded-input border border-white/10 bg-white/[0.035] px-3 text-sm text-reno-text-1 placeholder:text-reno-text-3 focus:border-indigo-400/60 focus:outline-none"
              />

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-left text-xs uppercase tracking-[0.08em] text-reno-text-3">
                    <tr>
                      <th className="pb-3 pr-4 font-medium">Business</th>
                      <th className="pb-3 pr-4 font-medium">Phone</th>
                      <th className="pb-3 pr-4 font-medium">Location</th>
                      <th className="pb-3 font-medium">Stage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLegacy.slice(0, 200).map((c) => (
                      <tr key={c.id} className="border-t border-white/6 transition-colors hover:bg-white/[0.03]">
                        <td className="py-2.5 pr-4 font-medium text-reno-text-1">{c.businessName}</td>
                        <td className="num-tabular py-2.5 pr-4 text-reno-text-2">{c.phone}</td>
                        <td className="py-2.5 pr-4 text-reno-text-2">
                          {[c.city, c.state].filter(Boolean).join(", ") || "—"}
                        </td>
                        <td className="py-2.5">
                          <StatusBadge tone="warning">
                            {LEGACY_STAGE_LABELS[c.stage] ?? c.stage}
                          </StatusBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredLegacy.length > 200 && (
                  <p className="mt-3 text-center text-xs text-reno-text-3">
                    Showing 200 of {filteredLegacy.length} — use search to filter
                  </p>
                )}
                {filteredLegacy.length === 0 && (
                  <p className="py-4 text-center text-sm text-reno-text-3">No matches</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
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
