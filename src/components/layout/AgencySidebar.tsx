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
  Cog,
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
    <aside className="glass-sidebar fixed inset-y-0 left-0 z-40 hidden w-[260px] flex-col md:flex">
      <div className="px-5 pb-4 pt-6">
        <Link href="/agency/dashboard" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-[0_0_24px_rgba(99,102,241,0.45)]">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="text-base font-semibold tracking-tight text-reno-text-1">RenoLaunch OS</p>
            <p className="text-sm text-reno-text-2">Agency Workspace</p>
          </div>
        </Link>
      </div>

      <div className="mx-5 h-px bg-white/10" />

      <nav className="flex-1 space-y-1.5 px-4 py-5">
        {agencyNavItems.map((item) => {
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
            <span className="block truncate text-sm text-reno-text-2">Agency Owner</span>
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
