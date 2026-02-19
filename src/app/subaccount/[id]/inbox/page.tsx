"use client";

import { ArrowLeft, Search, SendHorizontal, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  EmptyState,
  FieldInput,
  PrimaryButton,
  StatusBadge,
} from "@/components/prototype/primitives";
import { cn } from "@/lib/cn";

type InboxTab = "all" | "unread" | "ai";

interface ConversationSummary {
  id: string;
  status: "NEW" | "REPLIED" | "AI_HANDLING" | "CLOSED";
  aiHandling: boolean;
  lastMessageAt: string | null;
  createdAt: string;
  contact: {
    id: string;
    businessName: string;
    phone: string;
  };
  lastMessage: {
    body: string;
    direction: "OUTBOUND" | "INBOUND";
    sentAt: string;
  } | null;
}

interface ConversationMessage {
  id: string;
  direction: "OUTBOUND" | "INBOUND";
  body: string;
  isAI: boolean;
  sentAt: string;
}

function formatRelativeTime(value: string | null) {
  if (!value) return "-";

  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return "-";

  const diffMs = Date.now() - timestamp;
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "now";
  if (diffMinutes < 60) return `${diffMinutes}m`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d`;

  return new Date(value).toLocaleDateString();
}

export default function SubaccountInboxPage() {
  const params = useParams<{ id: string }>();
  const slug = typeof params.id === "string" ? params.id : "";

  const [activeTab, setActiveTab] = useState<InboxTab>("all");
  const [mobileView, setMobileView] = useState<"list" | "thread">("list");
  const [search, setSearch] = useState("");

  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(true);

  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    async function fetchConversations() {
      if (!slug) {
        setConversations([]);
        setSelectedConversationId(null);
        setLoadingConversations(false);
        return;
      }

      setLoadingConversations(true);

      try {
        const response = await fetch(`/api/conversations?subaccountId=${encodeURIComponent(slug)}&limit=20`, {
          cache: "no-store",
        });

        if (!response.ok) {
          setConversations([]);
          setSelectedConversationId(null);
          return;
        }

        const data = (await response.json()) as unknown;
        const nextConversations = Array.isArray(data) ? (data as ConversationSummary[]) : [];

        setConversations(nextConversations);
        setSelectedConversationId(nextConversations[0]?.id ?? null);
      } catch {
        setConversations([]);
        setSelectedConversationId(null);
      } finally {
        setLoadingConversations(false);
      }
    }

    void fetchConversations();
  }, [slug]);

  const fetchMessages = useCallback(async (conversationId: string) => {
    setLoadingMessages(true);

    try {
      const response = await fetch(`/api/conversations/${conversationId}/messages`, {
        cache: "no-store",
      });

      if (!response.ok) {
        setMessages([]);
        return;
      }

      const data = (await response.json()) as unknown;
      setMessages(Array.isArray(data) ? (data as ConversationMessage[]) : []);
    } catch {
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedConversationId) {
      setMessages([]);
      return;
    }

    void fetchMessages(selectedConversationId);
  }, [fetchMessages, selectedConversationId]);

  const filteredConversations = useMemo(() => {
    const needle = search.trim().toLowerCase();

    return conversations.filter((conversation) => {
      if (activeTab === "unread" && conversation.status !== "NEW") return false;
      if (activeTab === "ai" && !conversation.aiHandling) return false;

      if (!needle) return true;

      const haystack = `${conversation.contact.businessName} ${conversation.contact.phone} ${conversation.lastMessage?.body ?? ""}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [activeTab, conversations, search]);

  const selectedConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedConversationId) ?? null,
    [conversations, selectedConversationId],
  );

  const hasConversations = conversations.length > 0;

  return (
    <div className="glass-card h-[calc(100vh-6.8rem)] overflow-hidden md:h-[calc(100vh-8.5rem)]">
      <div className="hidden h-full md:flex">
        <aside className="w-[360px] shrink-0 border-r border-white/10 bg-white/[0.02]">
          <ConversationList
            activeTab={activeTab}
            onTabChange={setActiveTab}
            selectedConversationId={selectedConversationId}
            conversations={filteredConversations}
            loading={loadingConversations}
            search={search}
            onSearchChange={setSearch}
            onSelect={setSelectedConversationId}
          />
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          {hasConversations ? (
            <ThreadView selectedConversation={selectedConversation} messages={messages} loadingMessages={loadingMessages} />
          ) : (
            <div className="m-3">
              <EmptyState
                title="No conversations yet"
                detail="When messages exist for this subaccount, they will appear here."
              />
            </div>
          )}
        </section>
      </div>

      <div className="h-full md:hidden">
        {mobileView === "list" ? (
          <div className="h-full">
            <ConversationList
              activeTab={activeTab}
              onTabChange={setActiveTab}
              selectedConversationId={selectedConversationId}
              conversations={filteredConversations}
              loading={loadingConversations}
              search={search}
              onSearchChange={setSearch}
              onSelect={(conversationId) => {
                setSelectedConversationId(conversationId);
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

            {hasConversations ? (
              <ThreadView selectedConversation={selectedConversation} messages={messages} loadingMessages={loadingMessages} />
            ) : (
              <div className="m-3">
                <EmptyState
                  title="No conversations yet"
                  detail="When messages exist for this subaccount, they will appear here."
                />
              </div>
            )}
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
  conversations,
  loading,
  search,
  onSearchChange,
  onSelect,
}: {
  activeTab: InboxTab;
  onTabChange: (tab: InboxTab) => void;
  selectedConversationId: string | null;
  conversations: ConversationSummary[];
  loading: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      <div className="space-y-4 border-b border-white/10 p-4">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-2" />
          <FieldInput
            aria-label="Search conversations"
            className="pl-9"
            placeholder="Search conversations..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
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
        {loading ? (
          <p className="px-2 py-8 text-center text-sm text-reno-text-2">Loading conversations...</p>
        ) : null}

        {!loading && conversations.length === 0 ? (
          <EmptyState
            title="No conversations found"
            detail="Try changing filters, or wait for new inbound and outbound activity."
          />
        ) : null}

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
              conversation.status === "NEW" && "bg-white/[0.06]",
            )}
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/8 text-sm font-semibold text-reno-text-1">
              {conversation.contact.businessName
                .split(" ")
                .map((segment) => segment[0])
                .join("")
                .slice(0, 2)}
            </span>
            <span className="min-w-0 flex-1">
              <span className="mb-1 flex items-center justify-between gap-2">
                <span className="truncate text-sm font-semibold text-reno-text-1">{conversation.contact.businessName}</span>
                <span className="num-tabular shrink-0 text-sm text-reno-text-3">
                  {formatRelativeTime(conversation.lastMessageAt ?? conversation.createdAt)}
                </span>
              </span>
              <span className="block truncate text-sm text-reno-text-2">
                {conversation.lastMessage?.body ?? "No messages yet"}
              </span>
            </span>
            {conversation.status === "NEW" ? <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-white" /> : null}
          </button>
        ))}
      </div>
    </>
  );
}

function ThreadView({
  selectedConversation,
  messages,
  loadingMessages,
}: {
  selectedConversation: ConversationSummary | null;
  messages: ConversationMessage[];
  loadingMessages: boolean;
}) {
  if (!selectedConversation) {
    return (
      <div className="m-3">
        <EmptyState title="Select a conversation" detail="Pick a conversation from the left panel to view the full thread." />
      </div>
    );
  }

  return (
    <>
      <header className="glass-card m-3 flex items-center justify-between gap-3 rounded-[10px] px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-reno-text-1">{selectedConversation.contact.businessName}</h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-reno-text-2">
            <StatusBadge tone="accent">{selectedConversation.contact.phone}</StatusBadge>
            {selectedConversation.aiHandling ? (
              <span className="inline-flex items-center gap-1 rounded-pill border border-violet-400/40 bg-violet-500/20 px-2 py-0.5 text-xs text-violet-200 shadow-[0_0_12px_rgba(139,92,246,0.35)]">
                <Sparkles size={11} />
                AI Handling
              </span>
            ) : null}
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-3 pb-3">
        {loadingMessages ? <p className="text-sm text-reno-text-2">Loading messages...</p> : null}

        {!loadingMessages && messages.length === 0 ? (
          <EmptyState title="No messages yet" detail="This conversation does not have message history yet." />
        ) : null}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] rounded-[12px] px-4 py-3 text-sm md:max-w-[70%]",
              message.direction === "OUTBOUND"
                ? "ml-auto bg-gradient-to-br from-indigo-500 to-violet-500 text-white"
                : "glass-card text-reno-text-1",
            )}
          >
            {message.isAI ? (
              <span className="mb-2 inline-flex items-center gap-1 rounded-pill border border-violet-400/40 bg-violet-500/20 px-2 py-0.5 text-xs text-violet-200 shadow-[0_0_12px_rgba(139,92,246,0.35)]">
                <Sparkles size={11} />
                AI
              </span>
            ) : null}
            <p>{message.body}</p>
          </div>
        ))}
      </div>

      <footer className="border-t border-white/10 p-3">
        <div className="glass-card flex items-center gap-2 rounded-pill p-2">
          <FieldInput
            aria-label="Message input"
            className="h-11 flex-1 rounded-pill border-none bg-transparent focus:ring-0"
            placeholder="Type a message..."
          />
          <PrimaryButton className="h-11 rounded-pill px-5">
            <SendHorizontal size={15} />
            Send
          </PrimaryButton>
        </div>
      </footer>
    </>
  );
}
