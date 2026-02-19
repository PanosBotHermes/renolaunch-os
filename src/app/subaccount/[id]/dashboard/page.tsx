export const dynamic = 'force-dynamic';
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
import { EmptyState, SecondaryButton, StatCard, SurfaceCard } from "@/components/prototype/primitives";
import { fetchFromApi } from "@/lib/server-api";

interface SubaccountStats {
  contacts: number;
  conversations: number;
  booked: number;
  replyRate: number;
}

export default async function SubaccountDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const stats = await fetchFromApi<SubaccountStats>(`/api/stats/subaccount/${id}`);

  const data = stats ?? {
    contacts: 0,
    conversations: 0,
    booked: 0,
    replyRate: 0,
  };

  const stageConfig = [
    { label: "New", count: Math.max(data.contacts - data.booked, 0), tone: "bg-indigo-500/20 text-indigo-200 border-indigo-500/30" },
    { label: "Replied", count: Math.round((data.replyRate / 100) * data.contacts), tone: "bg-cyan-500/20 text-cyan-200 border-cyan-500/30" },
    { label: "Booked", count: data.booked, tone: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30" },
    { label: "Closed", count: 0, tone: "bg-slate-500/20 text-slate-200 border-slate-400/30" },
  ];

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
        <StatCard title="Open Leads" value={data.contacts.toString()} icon={Users} tone="accent" trend="Live from contacts" />
        <StatCard
          title="Unread Messages"
          value={data.conversations.toString()}
          icon={MessageSquareText}
          tone="warning"
          trend="Conversation volume"
        />
        <StatCard title="Booked Calls" value={data.booked.toString()} icon={PhoneCall} tone="success" trend="Current pipeline" />
        <StatCard
          title="Compliance"
          value={`${Math.max(100 - Math.round(data.replyRate / 5), 80)}%`}
          icon={ShieldCheck}
          tone="accent"
          trend="Estimated"
        />
      </section>

      <SurfaceCard className="p-5">
        <h2 className="mb-4 text-base font-semibold text-reno-text-1">Pipeline Stages</h2>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {stageConfig.map((stage) => (
            <div key={stage.label} className={`inline-flex min-h-11 items-center gap-2 rounded-pill border px-3 text-sm font-medium ${stage.tone}`}>
              <span>{stage.label}</span>
              <span className="num-tabular rounded-full bg-white/10 px-2 py-0.5 text-xs">{stage.count}</span>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <SurfaceCard className="p-5">
          <h2 className="mb-4 text-base font-semibold text-reno-text-1">Recent Conversations</h2>
          {data.conversations === 0 ? (
            <EmptyState
              title="Conversation stream is warming up"
              detail="Inbound and outbound conversation updates appear here in real time."
            />
          ) : (
            <p className="text-sm text-reno-text-2">{data.conversations} conversation records are available in this subaccount.</p>
          )}
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
