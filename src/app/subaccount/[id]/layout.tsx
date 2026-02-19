import type { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SubaccountSidebar } from "@/components/layout/SubaccountSidebar";
import { SubaccountTopBar } from "@/components/layout/SubaccountTopBar";

export default async function SubaccountLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { id } = await params;

  return (
    <div className="min-h-screen bg-reno-bg text-reno-text-1">
      <SubaccountSidebar id={id} />
      <SubaccountTopBar />
      <main className="animate-in px-4 pb-24 pt-20 md:ml-[260px] md:px-8 md:pb-8 md:pt-24">
        {children}
      </main>
      <MobileBottomNav variant="subaccount" id={id} />
    </div>
  );
}
