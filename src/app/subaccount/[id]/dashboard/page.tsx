import type { PipelineStage } from "@prisma/client";
import { MessageSquareText, PhoneCall, SearchCheck, SendHorizontal, ShieldCheck, Sparkles, UserPlus, Users } from "lucide-react";
import { EmptyState, SecondaryButton, StatCard, SurfaceCard } from "@/components/prototype/primitives";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

const STAGE_CONFIG: { key: PipelineStage; label: string; tone: string }[] = [
  { key: "NEW_LEAD",   label: "New",        tone: "bg-indigo-500/20 text-indigo-200 border-indigo-500/30" },
  { key: "CONTACTED",  label: "Contacted",  tone: "bg-blue-500/20 text-blue-200 border-blue-500/30" },
  { key: "REPLIED",    label: "Replied",    tone: "bg-cyan-500/20 text-cyan-200 border-cyan-500/30" },
  { key: "QUALIFIED",  label: "Qualified",  tone: "bg-amber-500/20 text-amber-200 border-amber-500/30" },
  { key: "BOOKED",     label: "Booked",     tone: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30" },
  { key: "CLOSED",     label: "Closed",     tone: "bg-slate-500/20 text-slate-200 border-slate-400/30" },
];

export default async function SubaccountDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let contacts = 0, conversations = 0, booked = 0, replyRate = 0;
  let stageCounts: { label: string; count: number; tone: string }[] = STAGE_CONFIG.map(s => ({ label: s.label, count: 0, tone: s.tone }));

  try {
    const subaccount = await db.subaccount.findUnique({ where: { slug: id }, select: { id: true } });
    if (subaccount) {
      const [c, cv, b, inbound, grouped] = await Promise.all([
        db.contact.count({ where: { subaccountId: subaccount.id } }),
        db.conversation.count({ where: { subaccountId: subaccount.id } }),
        db.contact.count({ where: { subaccountId: subaccount.id, stage: "BOOKED" } }),
        db.conversation.count({ where: { subaccountId: subaccount.id, messages: { some: { direction: "INBOUND" } } } }),
        db.contact.groupBy({ by: ["stage"], where: { subaccountId: subaccount.id }, _count: { _all: true } }),
      ]);
      contacts = c; conversations = cv; booked = b;
      replyRate = cv > 0 ? Math.round((inbound / cv) * 100) : 0;
      const countMap = new Map(grouped.map(g => [g.stage, g._count._all]));
      stageCounts = STAGE_CONFIG.map(s => ({ label: s.label, count: countMap.get(s.key) ?? 0, tone: s.tone }));
    }
  } catch { /* DB unavailable — show zeros */ }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
        <StatCard title="Contacts" value={String(contacts)} icon={<Users size={18} />} tone="accent" trend="Live" trendDirection="neutral" />
        <StatCard title="Conversations" value={String(conversations)} icon={<MessageSquareText size={18} />} tone="warning" trend="Live" trendDirection="neutral" />
        <StatCard title="Booked" value={String(booked)} icon={<PhoneCall size={18} />} tone="success" trend="Live" trendDirection="neutral" />
        <StatCard title="Reply Rate" value={replyRate + "%"} icon={<ShieldCheck size={18} />} tone="accent" trend="Live" trendDirection="neutral" />
      </section>

      <SurfaceCard className="p-5">
        <h2 className="mb-4 text-base font-semibold text-reno-text-1">Pipeline Stages</h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {stageCounts.map(stage => (
            <div key={stage.label} className={"inline-flex min-h-11 items-center gap-2 rounded-pill border px-3 text-sm font-medium " + stage.tone}>
              <span>{stage.label}</span>
              <span className="num-tabular rounded-full bg-white/10 px-2 py-0.5 text-xs">{stage.count}</span>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <SurfaceCard className="p-5">
          <h2 className="mb-4 text-base font-semibold text-reno-text-1">Recent Conversations</h2>
          <EmptyState title="Conversation stream" detail="Inbound and outbound updates appear here in real time." />
        </SurfaceCard>
        <SurfaceCard className="p-5">
          <h2 className="mb-4 text-base font-semibold text-reno-text-1">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[["New Blast", SendHorizontal], ["Add Contact", UserPlus], ["Qualify Lead", SearchCheck], ["AI Assist", Sparkles]].map(([label]) => (
              <button key={String(label)} type="button" className="glass-card btn-press flex min-h-11 flex-col items-center justify-center gap-1.5 p-3 text-center text-sm text-reno-text-1 transition-all hover:-translate-y-0.5">
                <span>{String(label)}</span>
              </button>
            ))}
          </div>
          <div className="mt-4">
            <SecondaryButton className="w-full justify-center"><PhoneCall size={16} />Create Follow-up Task</SecondaryButton>
          </div>
        </SurfaceCard>
      </section>
    </div>
  );
}
