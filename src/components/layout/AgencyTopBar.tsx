"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { AccountSwitcher } from "@/components/layout/AccountSwitcher";

const titleMap: Record<string, string> = {
  dashboard: "Dashboard",
  clients: "Clients",
  contacts: "Contacts",
  sms: "SMS",
  reports: "Reports",
  settings: "Settings",
};

export function AgencyTopBar() {
  const pathname = usePathname();
  const section = pathname.split("/")[2] ?? "dashboard";
  const title = titleMap[section] ?? "Dashboard";

  return (
    <header className="fixed left-0 right-0 top-0 z-30 h-[60px] border-b border-[rgba(255,255,255,0.06)] bg-[rgba(8,13,24,0.68)] backdrop-blur-[20px] md:left-[260px]">
      <div className="flex h-full items-center justify-between gap-3 px-4 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation"
            className="btn-ghost inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-reno-text-2 md:hidden"
          >
            <Menu size={19} />
          </button>
          <h1 className="truncate text-base font-semibold tracking-tight text-reno-text-1">{title}</h1>
        </div>

        <div className="hidden md:block">
          <AccountSwitcher />
        </div>
        <div className="md:hidden">
          <AccountSwitcher compact />
        </div>
      </div>
    </header>
  );
}
