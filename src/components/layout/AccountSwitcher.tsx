"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getSubaccountName, subaccountOptions } from "@/lib/accounts";
import { cn } from "@/lib/cn";

interface SwitcherItem {
  label: string;
  href: string;
}

export function AccountSwitcher({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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

  const items: SwitcherItem[] = useMemo(
    () => [
      { label: "Agency View", href: "/agency/dashboard" },
      ...subaccountOptions.map((subaccount) => ({
        label: subaccount.name,
        href: `/subaccount/${subaccount.id}/dashboard`,
      })),
    ],
    [],
  );

  const currentLabel = useMemo(() => {
    if (pathname.startsWith("/agency")) return "Agency View";
    const accountId = pathname.split("/")[2] ?? "renolaunch";
    return getSubaccountName(accountId);
  }, [pathname]);

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
