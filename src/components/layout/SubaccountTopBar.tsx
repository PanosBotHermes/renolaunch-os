"use client";

import { usePathname } from "next/navigation";
import { AccountSwitcher } from "@/components/layout/AccountSwitcher";
import { getSubaccountName } from "@/lib/accounts";

const titleMap: Record<string, string> = {
  dashboard: "Dashboard",
  contacts: "Contacts",
  pipelines: "Pipelines",
  inbox: "Inbox",
  sms: "SMS",
  settings: "Settings",
};

export function SubaccountTopBar({ id }: { id: string }) {
  const pathname = usePathname();
  const section = pathname.split("/")[3] ?? "dashboard";
  const accountName = getSubaccountName(id);

  return (
    <header className="fixed left-60 right-0 top-0 z-30 border-b border-reno-border bg-reno-bg/95 px-8 py-4 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-reno-text-primary">
            {accountName} {titleMap[section] ?? "Dashboard"}
          </h1>
          <p className="text-sm text-reno-text-secondary">Subaccount workspace and conversation ops</p>
        </div>
        <AccountSwitcher />
      </div>
    </header>
  );
}
