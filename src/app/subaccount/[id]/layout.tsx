'use client';
import type { ReactNode } from "react";
import { SubaccountSidebar } from "@/components/layout/SubaccountSidebar";
import { SubaccountTopBar } from "@/components/layout/SubaccountTopBar";

export default async function SubaccountLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-reno-bg text-reno-text-primary">
      <SubaccountSidebar id={id} />
      <SubaccountTopBar id={id} />
      <main className="ml-60 px-8 pb-8 pt-24">{children}</main>
    </div>
  );
}
