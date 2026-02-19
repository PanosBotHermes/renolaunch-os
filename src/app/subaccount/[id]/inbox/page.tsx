'use client';

import { ArrowLeft, Search, SendHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { FieldInput, PrimaryButton, StatusBadge } from "@/components/prototype/primitives";
import { cn } from "@/lib/cn";

type InboxTab = "all" | "unread" | "ai";

interface Conversation {
  id: string;
  name: string;
  trade: string;
  city: string;
  preview: string;
  time: string;
  unread: boolean;
}

interface Message {
  id: string;
  type: "sent" | "received";
  text: string;
  ai?: boolean;
}

const conversations: Conversation[] = [
  {
    id: "c1",
    name: "Maya Santos",
    trade: "Roofing",
    city: "Reno, NV",
    preview: "Can you fit me in Thursday afternoon?",
    time: "2m",
    unread: true,
  },
  {
    id: "c2",
    name: "Eli Turner",
    trade: "Plumbing",
    city: "Las Vegas, NV",
    preview: "Thanks, that quote looks good.",
    time: "18m",
    unread: true,
  },
  {
    id: "c3",
    name: "Jordan Patel",
    trade: "HVAC",
    city: "Sacramento, CA",
    preview: "Can we move this to next week?",
    time: "1h",
    unread: false,
  },
];

const messageThread: Message[] = [
  { id: "m1", type: "received", text: "Hey, I need a roof inspection this week." },
  { id: "m2", type: "sent", text: "Absolutely. We have openings Thursday and Friday." },
  { id: "m3", type: "sent", text: "AI suggested this follow-up template.", ai: true },
  { id: "m4", type: "received", text: "Thursday at 2pm works for me." },
];

export default function SubaccountInboxPage() {
  const [activeTab, setActiveTab] = useState<InboxTab>("all");
  const [selectedConversationId, setSelectedConversationId] = useState<string>(conversations[0].id);
  const [mobileView, setMobileView] = useState<"list" | "thread">("list");

  const selectedConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedConversationId) ?? conversations[0],
    [selectedConversationId],
  );

  return (
    <div className="glass-card h-[calc(100vh-6.8rem)] overflow-hidden md:h-[calc(100vh-8.5rem)]">
      <div className="hidden h-full md:flex">
        <aside className="w-[360px] shrink-0 border-r border-white/10 bg-white/[0.02]">
          <ConversationList
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedConversationId={selectedConversationId}
            onSelect={setSelectedConversationId}
          />
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <ThreadView selectedConversation={selectedConversation} />
        </section>
      </div>

      <div className="h-full md:hidden">
        {mobileView === "list" ? (
          <div className="h-full">
            <ConversationList
              activeTab={activeTab}
              onTabChange={setActiveTab}
              selectedConversationId={selectedConversationId}
              onSelect={(id) => {
                setSelectedConversationId(id);
                setMobileView("thread");
              }}
            />
          </div>
        ) : (
          <section className="animate-in flex h-full min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <button
                type="button"
                onClick={() => setMobileView("list")}
                className="btn-ghost inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-reno-text-2"
                aria-label="Back to conversations"
              >
                <ArrowLeft size={18} />
              </button>
              <p className="text-sm font-semibold text-reno-text-1">Back</p>
            </div>
            <ThreadView selectedConversation={selectedConversation} />
          </section>
        )}
      </div>
    </div>
  );
}

function ConversationList({
  activeTab,
  onTabChange,
  selectedConversationId,
  onSelect,
}: {
  activeTab: InboxTab;
  onTabChange: (tab: InboxTab) => void;
  selectedConversationId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <div className="space-y-4 border-b border-white/10 p-4">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-2" />
          <FieldInput aria-label="Search conversations" className="pl-9" placeholder="Search conversations..." />
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
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "inline-flex min-h-11 items-center justify-center rounded-input border text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "border-indigo-400/60 bg-indigo-500/20 text-indigo-200"
                  : "border-white/10 bg-white/[0.02] text-reno-text-2 hover:text-reno-text-1",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[calc(100%-8.6rem)] space-y-2 overflow-y-auto p-3">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            type="button"
            onClick={() => onSelect(conversation.id)}
            className={cn(
              "glass-card flex w-full min-h-11 items-start gap-3 border-l-2 p-3 text-left transition-all",
              conversation.id === selectedConversationId
                ? "border-l-indigo-500 bg-indigo-500/10"
                : "border-l-transparent",
              conversation.unread && "bg-white/[0.06]",
            )}
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/8 text-sm font-semibold text-reno-text-1">
              {conversation.name
                .split(" ")
                .map((segment) => segment[0])
                .join("")
                .slice(0, 2)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="mb-1 flex items-center justify-between gap-2">
                <span className="truncate text-sm font-semibold text-reno-text-1">{conversation.name}</span>
                <span className="num-tabular shrink-0 text-sm text-reno-text-3">{conversation.time}</span>
              </span>
              <span className="block truncate text-sm text-reno-text-2">{conversation.preview}</span>
            </span>
            {conversation.unread ? <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-white" /> : null}
          </button>
        ))}
      </div>
    </>
  );
}

function ThreadView({ selectedConversation }: { selectedConversation: Conversation }) {
  return (
    <>
      <header className="glass-card m-3 flex items-center justify-between gap-3 rounded-[10px] px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-reno-text-1">{selectedConversation.name}</h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-reno-text-2">
            <StatusBadge tone="accent">{selectedConversation.trade}</StatusBadge>
            <span>{selectedConversation.city}</span>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-3 pb-3">
        {messageThread.map((message) => (
          <div key={message.id} className={cn("max-w-[85%] rounded-[12px] px-4 py-3 text-sm md:max-w-[70%]", message.type === "sent" ? "ml-auto bg-gradient-to-br from-indigo-500 to-violet-500 text-white" : "glass-card text-reno-text-1")}>
            {message.ai ? (
              <span className="mb-2 inline-flex items-center gap-1 rounded-pill border border-violet-400/40 bg-violet-500/20 px-2 py-0.5 text-xs text-violet-200 shadow-[0_0_12px_rgba(139,92,246,0.35)]">
                <Sparkles size={11} />
                AI
              </span>
            ) : null}
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <footer className="border-t border-white/10 p-3">
        <div className="glass-card flex items-center gap-2 rounded-pill p-2">
          <FieldInput aria-label="Message input" className="h-11 flex-1 rounded-pill border-none bg-transparent focus:ring-0" placeholder="Type a message..." />
          <PrimaryButton className="h-11 rounded-pill px-5">
            <SendHorizontal size={15} />
            Send
          </PrimaryButton>
        </div>
      </footer>
    </>
  );
}
