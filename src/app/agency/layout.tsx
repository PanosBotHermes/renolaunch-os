'use client';
import type { ReactNode } from "react";
import { AgencySidebar } from "@/components/layout/AgencySidebar";
import { AgencyTopBar } from "@/components/layout/AgencyTopBar";

export default function AgencyLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-reno-bg text-reno-text-primary">
      <AgencySidebar />
      <AgencyTopBar />
      <main className="ml-60 px-8 pb-8 pt-24">{children}</main>
    </div>
  );
}
