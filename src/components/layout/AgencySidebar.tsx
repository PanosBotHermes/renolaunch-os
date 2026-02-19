"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  Sparkles,
  UserCircle2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";

const agencyNavItems = [
  { href: "/agency/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/agency/clients", label: "Clients", icon: Building2 },
  { href: "/agency/contacts", label: "Contacts", icon: Users },
  { href: "/agency/sms", label: "SMS", icon: MessageSquareText },
  { href: "/agency/reports", label: "Reports", icon: BarChart3 },
  { href: "/agency/settings", label: "Settings", icon: Settings },
];

export function AgencySidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-reno-border bg-reno-bg">
      <div className="border-b border-reno-border px-5 py-5">
        <Link href="/agency/dashboard" className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-card bg-gradient-to-br from-indigo-500 to-indigo-400 text-white">
            <Sparkles size={16} />
          </span>
          <div>
            <p className="text-base font-semibold text-reno-text-primary">RenoLaunch OS</p>
            <p className="text-xs text-reno-text-secondary">Agency Workspace</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {agencyNavItems.map((item) => {
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

      <div className="border-t border-reno-border p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-md border border-reno-border bg-reno-card px-3 py-2 text-left"
        >
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-reno-accent/20 text-reno-accent">
            <UserCircle2 size={18} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-reno-text-primary">Agency User</span>
            <span className="block truncate text-xs text-reno-text-secondary">Owner</span>
          </span>
        </button>
      </div>
    </aside>
  );
}
