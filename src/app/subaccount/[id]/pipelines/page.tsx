'use client';
import { StatusBadge, SurfaceCard } from "@/components/prototype/primitives";

const columns = [
  { label: "New Lead", color: "#6366F1" },
  { label: "Contacted", color: "#38BDF8" },
  { label: "Replied", color: "#22C55E" },
  { label: "Qualified", color: "#F59E0B" },
  { label: "Booked", color: "#A855F7" },
  { label: "Closed", color: "#14B8A6" },
];

export default function SubaccountPipelinesPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold text-reno-text-primary">Pipeline Board</h2>
        <p className="text-sm text-reno-text-secondary">Drag-and-drop stage planning surface</p>
      </section>

      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-max gap-4">
          {columns.map((column) => (
            <SurfaceCard key={column.label} className="w-80 overflow-hidden">
              <div className="border-t-2 px-4 pb-4 pt-3" style={{ borderTopColor: column.color }}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-reno-text-primary">{column.label}</h3>
                  <StatusBadge>0</StatusBadge>
                </div>

                <div className="rounded-card border border-dashed border-reno-border/80 bg-reno-bg/40 p-4 text-sm text-reno-text-secondary">
                  No contacts in this stage.
                </div>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </div>
  );
}
