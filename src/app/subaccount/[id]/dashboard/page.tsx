import type { PipelineStage } from "@prisma/client";
import {
  MessageSquareText,
  PhoneCall,
  SearchCheck,
  SendHorizontal,
  ShieldCheck,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";
import {
  EmptyState,
  SecondaryButton,
  StatCard,
  SurfaceCard,
} from "@/components/prototype/primitives";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

interface SubaccountStats {
  contacts: number;
  conversations: number;
  booked: number;
  replyRate: number;
}

const STAGE_CONFIG: {
  key: PipelineStage;
  label: string;
  tone: string;
}[] = [
  { key: "NEW_LEAD", label: "New", tone: "bg-indigo-500/20 text-indigo-200 border-indigo-500/30" },
  { key: "CONTACTED", label: "Contacted", tone: "bg-blue-500/20 text-blue-200 border-blue-500/30" },
  { key: "REPLIED", label: "Replied", tone: "bg-cyan-500/20 text-cyan-200 border-cyan-500/30" },
  { key: "QUALIFIED", label: "Qualified", tone: "bg-amber-500/20 text-amber-200 border-amber-500/30" },
  { key: "BOOKED", label: "Booked", tone: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30" },
  { key: "CLOSED", label: "Closed", tone: "bg-slate-500/20 text-slate-200 border-slate-400/30" },
];

async function fetchStats(slug: string): Promise<SubaccountStats> {
  try {
    const subaccount = await db.subaccount.findUnique({ where: { slug }, select: { id: true } });
    if (!subaccount) return { contacts: 0, conversations: 0, booked: 0, replyRate: 0 };
    const [contacts, conversations, booked, inboundConvos] = await Promise.all([
      db.contact.count({ where: { subaccountId: subaccount.id } }),
      db.conversation.count({ where: { subaccountId: subaccount.id } }),
      db.contact.count({ where: { subaccountId: subaccount.id, stage: "BOOKED" } }),
      db.conversation.count({ where: { subaccountId: subaccount.id, messages: { some: { direction: "INBOUND" } } } }),
    ]);
    const replyRate = conversations > 0 ? Math.round((inboundConvos / conversations) * 100) : 0;
    return { contacts, conversations, booked, replyRate };
  } catch {
    return { contacts: 0, conversations: 0, booked: 0, replyRate: 0 };
  }
}

async function fetchPipelineStages(slug: string): Promise<{ label: string; count: number; tone: string }[]> {
  try {
    const subaccount = await db.subaccount.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!subaccount) {
      return STAGE_CONFIG.map((stage) => ({ label: stage.label, count: 0, tone: stage.tone }));
    }

    const groupedStages = await db.contact.groupBy({
      by: ["stage"],
      where: { subaccountId: subaccount.id },
      _count: { _all: true },
    });

    const countByStage = new Map<PipelineStage, number>(
      groupedStages.map((entry) => [entry.stage, entry._count._all]),
    );

    return STAGE_CONFIG.map((stage) => ({
      label: stage.label,
      count: countByStage.get(stage.key) ?? 0,
      tone: stage.tone,
    }));
  } catch {
    return STAGE_CONFIG.map((stage) => ({ label: stage.label, count: 0, tone: stage.tone }));
  }
}

export default async function SubaccountDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [stats, stageConfig] = await Promise.all([fetchStats(id), fetchPipelineStages(id)]);

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
        <StatCard
          title="Contacts"
          value={stats.contacts.toLocaleString()}
          icon={Users}
          tone="accent"
          trend="Live"
          trendDirection="neutral"
        />
        <StatCard
          title="Conversations"
          value={stats.conversations.toLocaleString()}
          icon={MessageSquareText}
          tone="warning"
          trend="Live"
          trendDirection="neutral"
        />
        <StatCard
          title="Booked"
          value={stats.booked.toLocaleString()}
          icon={PhoneCall}
          tone="success"
          trend="Live"
          trendDirection="neutral"
        />
        <StatCard
          title="Reply Rate"
          value={`${stats.replyRate.toFixed(1)}%`}
          icon={ShieldCheck}
          tone="accent"
          trend="Live"
          trendDirection="neutral"
        />
      </section>

      <SurfaceCard className="p-5">
        <h2 className="mb-4 text-base font-semibold text-reno-text-1">Pipeline Stages</h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {stageConfig.map((stage) => (
            <div
              key={stage.label}
              className={`inline-flex min-h-11 items-center gap-2 rounded-pill border px-3 text-sm font-medium ${stage.tone}`}
            >
              <span>{stage.label}</span>
              <span className="num-tabular rounded-full bg-white/10 px-2 py-0.5 text-xs">{stage.count}</span>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <SurfaceCard className="p-5">
          <h2 className="mb-4 text-base font-semibold text-reno-text-1">Recent Conversations</h2>
          <EmptyState
            title="Conversation stream is warming up"
            detail="Inbound and outbound conversation updates appear here in real time."
          />
        </SurfaceCard>

        <SurfaceCard className="p-5">
          <h2 className="mb-4 text-base font-semibold text-reno-text-1">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="glass-card btn-press flex min-h-11 flex-col items-center justify-center gap-1.5 p-3 text-center text-sm text-reno-text-1 transition-all hover:-translate-y-0.5"
            >
              <SendHorizontal size={16} />
              New Blast
            </button>
            <button
              type="button"
              className="glass-card btn-press flex min-h-11 flex-col items-center justify-center gap-1.5 p-3 text-center text-sm text-reno-text-1 transition-all hover:-translate-y-0.5"
            >
              <UserPlus size={16} />
              Add Contact
            </button>
            <button
              type="button"
              className="glass-card btn-press flex min-h-11 flex-col items-center justify-center gap-1.5 p-3 text-center text-sm text-reno-text-1 transition-all hover:-translate-y-0.5"
            >
              <SearchCheck size={16} />
              Qualify Lead
            </button>
            <button
              type="button"
              className="glass-card btn-press flex min-h-11 flex-col items-center justify-center gap-1.5 p-3 text-center text-sm text-reno-text-1 transition-all hover:-translate-y-0.5"
            >
              <Sparkles size={16} />
              AI Assist
            </button>
          </div>
          <div className="mt-4">
            <SecondaryButton className="w-full justify-center">
              <PhoneCall size={16} />
              Create Follow-up Task
            </SecondaryButton>
          </div>
        </SurfaceCard>
      </section>
    </div>
  );
}
