"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Inbox,
  KanbanSquare,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  Users,
} from "lucide-react";
import { getSubaccountName } from "@/lib/accounts";
import { cn } from "@/lib/cn";

export function SubaccountSidebar({ id }: { id: string }) {
  const pathname = usePathname();
  const accountName = getSubaccountName(id);

  const subaccountNav = [
    { href: `/subaccount/${id}/dashboard`, label: "Dashboard", icon: LayoutDashboard },
    { href: `/subaccount/${id}/contacts`, label: "Contacts", icon: Users },
    { href: `/subaccount/${id}/pipelines`, label: "Pipelines", icon: KanbanSquare },
    { href: `/subaccount/${id}/inbox`, label: "Inbox", icon: Inbox },
    { href: `/subaccount/${id}/sms`, label: "SMS", icon: MessageSquareText },
    { href: `/subaccount/${id}/settings`, label: "Settings", icon: Settings },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-reno-border bg-reno-bg">
      <div className="space-y-4 border-b border-reno-border px-4 py-5">
        <Link
          href="/agency/dashboard"
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-reno-text-secondary transition-colors hover:text-reno-text-primary"
        >
          <ArrowLeft size={15} />
          Agency
        </Link>

        <div className="rounded-card border border-reno-border bg-reno-card p-3">
          <p className="text-xs uppercase tracking-wide text-reno-text-secondary">Subaccount</p>
          <p className="mt-1 text-base font-semibold text-reno-text-primary">{accountName}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {subaccountNav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-reno-accent text-white"
                  : "text-reno-text-secondary hover:bg-reno-card hover:text-reno-text-primary",
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
