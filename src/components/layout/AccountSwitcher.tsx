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

export function AccountSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const items: SwitcherItem[] = useMemo(() => {
    return [
      { label: "Agency View", href: "/agency/dashboard" },
      ...subaccountOptions.map((subaccount) => ({
        label: subaccount.name,
        href: `/subaccount/${subaccount.id}/dashboard`,
      })),
    ];
  }, []);

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
          "inline-flex h-10 min-w-52 items-center justify-between gap-3 rounded-input border border-reno-border bg-reno-card px-3",
          "text-sm font-medium text-reno-text-primary transition-colors hover:border-reno-accent/70",
        )}
        aria-expanded={open}
      >
        {currentLabel}
        <ChevronDown
          size={16}
          className={cn("text-reno-text-secondary transition-transform", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-card border border-reno-border bg-reno-card p-1 shadow-2xl shadow-black/40">
          {items.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-reno-accent/20 text-reno-accent"
                    : "text-reno-text-secondary hover:bg-reno-border/40 hover:text-reno-text-primary",
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
