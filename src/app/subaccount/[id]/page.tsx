import { redirect } from "next/navigation";

export default async function SubaccountRootPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/subaccount/${id}/dashboard`);
}
