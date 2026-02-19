'use client';
import type { ReactNode } from "react";
import { AgencySidebar } from "@/components/layout/AgencySidebar";
import { AgencyTopBar } from "@/components/layout/AgencyTopBar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export default function AgencyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-reno-bg text-reno-text-1">
      <AgencySidebar />
      <AgencyTopBar />
      <main className="animate-in px-4 pb-24 pt-20 md:ml-[260px] md:px-8 md:pb-8 md:pt-24">
        {children}
      </main>
      <MobileBottomNav variant="agency" />
    </div>
  );
}
