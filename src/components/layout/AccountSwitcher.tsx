"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  formatSubaccountName,
  getSubaccountName,
  subaccountOptions,
  type SubaccountOption,
} from "@/lib/accounts";
import { cn } from "@/lib/cn";

interface SwitcherItem {
  label: string;
  href: string;
}

export function AccountSwitcher({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState<SubaccountOption[]>(subaccountOptions);
  const [currentLabel, setCurrentLabel] = useState("Agency View");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }

    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    let active = true;

    async function loadAccounts() {
      try {
        const response = await fetch("/api/subaccounts", { cache: "no-store" });
        if (!response.ok) return;

        const data = (await response.json()) as Array<{
          id: string;
          name: string;
          slug: string;
        }>;

        if (!active || !Array.isArray(data) || data.length === 0) return;

        setAccounts(data.map((subaccount) => ({ id: subaccount.slug, name: subaccount.name })));
      } catch {
        // Keep fallback options when API isn't available.
      }
    }

    void loadAccounts();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/agency")) {
      setCurrentLabel("Agency View");
      return;
    }

    const accountId = pathname.split("/")[2] ?? "renolaunch";
    setCurrentLabel(formatSubaccountName(accountId));

    let active = true;

    async function resolveCurrentLabel() {
      const name = await getSubaccountName(accountId);
      if (active) setCurrentLabel(name);
    }

    void resolveCurrentLabel();

    return () => {
      active = false;
    };
  }, [pathname]);

  const items: SwitcherItem[] = useMemo(
    () => [
      { label: "Agency View", href: "/agency/dashboard" },
      ...accounts.map((subaccount) => ({
        label: subaccount.name,
        href: `/subaccount/${subaccount.id}/dashboard`,
      })),
    ],
    [accounts],
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "btn-secondary btn-press inline-flex min-h-11 items-center justify-between gap-2 rounded-pill border border-white/10 px-3 text-sm font-medium text-reno-text-1 transition-all hover:border-indigo-400/60",
          compact ? "w-[168px]" : "min-w-56",
        )}
        aria-expanded={open}
      >
        <span className="truncate">{currentLabel}</span>
        <ChevronDown size={16} className={cn("shrink-0 text-reno-text-2 transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="animate-in absolute right-0 z-50 mt-2 w-60 rounded-card border border-white/10 bg-white/[0.045] p-1.5 shadow-2xl shadow-black/40 backdrop-blur-[20px]">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-[8px] px-3 py-2.5 text-sm transition-all",
                  active
                    ? "bg-indigo-500/20 text-reno-text-1"
                    : "text-reno-text-2 hover:bg-white/6 hover:text-reno-text-1",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
