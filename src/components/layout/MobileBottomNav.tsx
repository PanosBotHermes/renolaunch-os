"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Inbox,
  KanbanSquare,
  LayoutDashboard,
  MessageSquareText,
  Building2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "agency" | "subaccount";

interface MobileBottomNavProps {
  variant: Variant;
  id?: string;
}

export function MobileBottomNav({ variant, id }: MobileBottomNavProps) {
  const pathname = usePathname();

  const items =
    variant === "agency"
      ? [
          { href: "/agency/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { href: "/agency/clients", label: "Clients", icon: Building2 },
          { href: "/agency/contacts", label: "Contacts", icon: Users },
          { href: "/agency/sms", label: "SMS", icon: MessageSquareText },
          { href: "/agency/reports", label: "Reports", icon: BarChart3 },
        ]
      : [
          { href: `/subaccount/${id}/dashboard`, label: "Dashboard", icon: LayoutDashboard },
          { href: `/subaccount/${id}/contacts`, label: "Contacts", icon: Users },
          { href: `/subaccount/${id}/pipelines`, label: "Pipelines", icon: KanbanSquare },
          { href: `/subaccount/${id}/inbox`, label: "Inbox", icon: Inbox },
          { href: `/subaccount/${id}/sms`, label: "SMS", icon: MessageSquareText },
        ];

  return (
    <nav className="glass-card fixed inset-x-0 bottom-0 z-50 h-[60px] rounded-none border-x-0 border-b-0 px-1 pb-[max(env(safe-area-inset-bottom),0px)] md:hidden">
      <ul className="grid h-full grid-cols-5">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <li key={item.href} className="h-full">
              <Link
                href={item.href}
                className={cn(
                  "relative flex h-full min-h-11 items-center justify-center text-reno-text-2 transition-colors",
                  active && "text-indigo-300",
                )}
              >
                <Icon size={21} />
                {active ? <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-indigo-400" /> : null}
                <span className="sr-only">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
