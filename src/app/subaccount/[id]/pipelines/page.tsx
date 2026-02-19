'use client';

import { ArrowRight, Building2 } from "lucide-react";
import { useMemo, useState } from "react";
import { StatusBadge, SurfaceCard } from "@/components/prototype/primitives";
import { cn } from "@/lib/cn";

interface PipelineCard {
  id: string;
  business: string;
  cityState: string;
  trade: string;
  timeAgo: string;
}

interface PipelineColumn {
  id: string;
  label: string;
  color: string;
  cards: PipelineCard[];
}

const columns: PipelineColumn[] = [
  {
    id: "new",
    label: "New",
    color: "#6366F1",
    cards: [
      { id: "lead-1", business: "Summit Roofing Co.", cityState: "Reno, NV", trade: "Roofing", timeAgo: "5m ago" },
      { id: "lead-2", business: "Valley Flow Plumbing", cityState: "Carson City, NV", trade: "Plumbing", timeAgo: "18m ago" },
    ],
  },
  {
    id: "contacted",
    label: "Contacted",
    color: "#3B82F6",
    cards: [{ id: "lead-3", business: "Apex HVAC", cityState: "Sparks, NV", trade: "HVAC", timeAgo: "1h ago" }],
  },
  {
    id: "replied",
    label: "Replied",
    color: "#06B6D4",
    cards: [{ id: "lead-4", business: "Prime Remodel", cityState: "Reno, NV", trade: "Remodeling", timeAgo: "2h ago" }],
  },
  {
    id: "qualified",
    label: "Qualified",
    color: "#F59E0B",
    cards: [{ id: "lead-5", business: "Heritage Electric", cityState: "Reno, NV", trade: "Electrical", timeAgo: "3h ago" }],
  },
  { id: "booked", label: "Booked", color: "#22C55E", cards: [] },
  { id: "closed", label: "Closed", color: "#64748B", cards: [] },
];

function tradeTone(trade: string): "accent" | "info" | "warning" {
  if (trade === "Roofing") return "accent";
  if (trade === "Plumbing" || trade === "HVAC") return "info";
  return "warning";
}

export default function SubaccountPipelinesPage() {
  const [selectedColumnId, setSelectedColumnId] = useState(columns[0].id);

  const selectedColumn = useMemo(
    () => columns.find((column) => column.id === selectedColumnId) ?? columns[0],
    [selectedColumnId],
  );

  return (
    <div className="space-y-5 md:space-y-6">
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-reno-text-1">Pipeline Board</h2>
        <p className="text-sm text-reno-text-2">Lead progression across every stage</p>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
        {columns.map((column) => (
          <button
            key={column.id}
            type="button"
            onClick={() => setSelectedColumnId(column.id)}
            className={cn(
              "inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-pill border px-3 text-sm font-medium transition-all",
              selectedColumnId === column.id
                ? "border-indigo-400/60 bg-indigo-500/20 text-indigo-200"
                : "border-white/10 bg-white/[0.03] text-reno-text-2 hover:text-reno-text-1",
            )}
          >
            {column.label}
            <span className="num-tabular rounded-full bg-white/10 px-2 py-0.5 text-xs">{column.cards.length}</span>
          </button>
        ))}
      </div>

      <div className="hidden overflow-x-auto pb-2 md:block">
        <div className="flex min-w-max gap-4">
          {columns.map((column) => (
            <div key={column.id} className="glass-card w-[320px] overflow-hidden rounded-b-card rounded-t-[0]">
              <div className="border-t-[3px] px-4 pb-4 pt-3" style={{ borderTopColor: column.color }}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-reno-text-1">{column.label}</h3>
                  <span
                    className="num-tabular rounded-pill px-2 py-1 text-xs font-medium"
                    style={{
                      color: column.color,
                      background: `${column.color}22`,
                      border: `1px solid ${column.color}44`,
                    }}
                  >
                    {column.cards.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {column.cards.length > 0 ? (
                    column.cards.map((card) => (
                      <SurfaceCard
                        key={card.id}
                        className="border-white/12 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-400/40"
                      >
                        <p className="font-semibold text-reno-text-1">{card.business}</p>
                        <p className="mt-1 text-sm text-reno-text-2">{card.cityState}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <StatusBadge tone={tradeTone(card.trade)}>{card.trade}</StatusBadge>
                          <span className="text-sm text-reno-text-3">{card.timeAgo}</span>
                        </div>
                      </SurfaceCard>
                    ))
                  ) : (
                    <div className="rounded-card border border-dashed border-white/15 bg-white/[0.02] p-4 text-sm text-reno-text-2">
                      <div className="mb-2 flex items-center gap-2 text-reno-text-3">
                        <Building2 size={15} />
                        Empty stage
                      </div>
                      No contacts in this stage yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden">
        <div className="glass-card overflow-hidden rounded-b-card rounded-t-[0]">
          <div className="border-t-[3px] px-4 pb-4 pt-3" style={{ borderTopColor: selectedColumn.color }}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-reno-text-1">{selectedColumn.label}</h3>
              <span
                className="num-tabular rounded-pill px-2 py-1 text-xs font-medium"
                style={{
                  color: selectedColumn.color,
                  background: `${selectedColumn.color}22`,
                  border: `1px solid ${selectedColumn.color}44`,
                }}
              >
                {selectedColumn.cards.length}
              </span>
            </div>

            <div className="space-y-3">
              {selectedColumn.cards.length > 0 ? (
                selectedColumn.cards.map((card) => (
                  <SurfaceCard key={card.id} className="p-4">
                    <p className="font-semibold text-reno-text-1">{card.business}</p>
                    <p className="mt-1 text-sm text-reno-text-2">{card.cityState}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <StatusBadge tone={tradeTone(card.trade)}>{card.trade}</StatusBadge>
                      <span className="text-sm text-reno-text-3">{card.timeAgo}</span>
                    </div>
                    <button
                      type="button"
                      className="btn-secondary btn-press mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-input text-sm text-reno-text-1"
                    >
                      Next stage
                      <ArrowRight size={15} />
                    </button>
                  </SurfaceCard>
                ))
              ) : (
                <div className="rounded-card border border-dashed border-white/15 bg-white/[0.02] p-5 text-center text-sm text-reno-text-2">
                  <Building2 size={18} className="mx-auto mb-2 text-reno-text-3" />
                  No contacts in this stage.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
