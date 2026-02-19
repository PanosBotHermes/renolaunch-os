"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Cog,
  Inbox,
  KanbanSquare,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  UserCircle2,
  Users,
  Building2,
} from "lucide-react";
import { formatSubaccountName, getSubaccountName } from "@/lib/accounts";
import { cn } from "@/lib/cn";

export function SubaccountSidebar({ id }: { id: string }) {
  const pathname = usePathname();
  const [accountName, setAccountName] = useState(() => formatSubaccountName(id));

  useEffect(() => {
    let active = true;

    async function resolveName() {
      const name = await getSubaccountName(id);
      if (active) setAccountName(name);
    }

    void resolveName();

    return () => {
      active = false;
    };
  }, [id]);

  const subaccountNav = [
    { href: `/subaccount/${id}/dashboard`, label: "Dashboard", icon: LayoutDashboard },
    { href: `/subaccount/${id}/contacts`, label: "Contacts", icon: Users },
    { href: `/subaccount/${id}/pipelines`, label: "Pipelines", icon: KanbanSquare },
    { href: `/subaccount/${id}/inbox`, label: "Inbox", icon: Inbox },
    { href: `/subaccount/${id}/sms`, label: "SMS", icon: MessageSquareText },
    { href: `/subaccount/${id}/settings`, label: "Settings", icon: Settings },
  ];

  return (
    <aside className="glass-sidebar fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col md:flex">
      <div className="space-y-4 px-5 pb-4 pt-6">
        <Link
          href="/agency/dashboard"
          className="btn-secondary inline-flex min-h-11 items-center gap-2 rounded-pill px-3 text-sm font-medium text-reno-text-1"
        >
          <ArrowLeft size={16} />
          Back to Agency
        </Link>

        <div className="glass-card rounded-[10px] p-3">
          <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-gradient-to-br from-indigo-500/30 to-violet-500/30 text-indigo-200">
            <Building2 size={16} />
          </div>
          <p className="text-sm text-reno-text-2">Subaccount</p>
          <p className="mt-1 text-base font-semibold tracking-tight text-reno-text-1">{accountName}</p>
        </div>
      </div>

      <div className="mx-5 h-px bg-white/10" />

      <nav className="flex-1 space-y-1.5 px-4 py-5">
        {subaccountNav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "nav-item flex min-h-11 items-center gap-3 rounded-[8px] border-l-2 border-transparent px-[10px] py-3 text-sm font-medium text-reno-text-2",
                active && "nav-item-active border-l-indigo-500 bg-indigo-500/12 text-reno-text-1 shadow-[0_0_22px_rgba(99,102,241,0.16)]",
              )}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-4">
        <div className="mb-3 h-px bg-white/10" />
        <div className="glass-card flex min-h-11 items-center gap-3 rounded-[10px] px-3 py-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-500/30 text-indigo-200">
            <UserCircle2 size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-reno-text-1">Panos</span>
            <span className="block truncate text-sm text-reno-text-2">Account Admin</span>
          </span>
          <button
            type="button"
            aria-label="Open user settings"
            className="btn-ghost inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-reno-text-2 transition-colors hover:text-reno-text-1"
          >
            <Cog size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
