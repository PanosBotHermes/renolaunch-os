"use client";

import { usePathname } from "next/navigation";
import { AccountSwitcher } from "@/components/layout/AccountSwitcher";

const titleMap: Record<string, string> = {
  dashboard: "Agency Dashboard",
  clients: "Client Accounts",
  contacts: "Contacts",
  sms: "SMS Center",
  reports: "Reports",
  settings: "Settings",
};

export function AgencyTopBar() {
  const pathname = usePathname();
  const section = pathname.split("/")[2] ?? "dashboard";
  const title = titleMap[section] ?? "Agency Dashboard";

  return (
    <header className="fixed left-60 right-0 top-0 z-30 border-b border-reno-border bg-reno-bg/95 px-8 py-4 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-reno-text-primary">{title}</h1>
          <p className="text-sm text-reno-text-secondary">Multi-tenant CRM control center</p>
        </div>
        <AccountSwitcher />
      </div>
    </header>
  );
}
