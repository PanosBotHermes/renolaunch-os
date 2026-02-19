import { Filter, Search } from "lucide-react";
import {
  EmptyState,
  FieldInput,
  FieldSelect,
  SecondaryButton,
  StatusBadge,
  SurfaceCard,
} from "@/components/prototype/primitives";
import { fetchFromApi } from "@/lib/server-api";

interface ContactRow {
  id: string;
  businessName: string;
  contactName: string | null;
  phone: string;
  city: string | null;
  state: string | null;
  trade: string | null;
  status: "NEW" | "CONTACTED" | "REPLIED" | "QUALIFIED" | "BOOKED" | "DNC";
  stage: "NEW_LEAD" | "CONTACTED" | "REPLIED" | "QUALIFIED" | "BOOKED" | "CLOSED";
  createdAt: string;
}

interface ContactsResponse {
  data: ContactRow[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

function toneForStatus(status: ContactRow["status"]): "success" | "info" | "warning" | "accent" | "error" {
  if (status === "BOOKED") return "success";
  if (status === "REPLIED") return "info";
  if (status === "QUALIFIED") return "accent";
  if (status === "DNC") return "error";
  return "warning";
}

function toLabel(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
}

export default async function SubaccountContactsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
    stage?: string;
  }>;
}) {
  const { id } = await params;
  const filters = await searchParams;

  const page = Number(filters.page ?? 1);
  const limit = Number(filters.limit ?? 20);
  const search = filters.search ?? "";
  const status = filters.status ?? "";
  const stage = filters.stage ?? "";

  const query = new URLSearchParams({
    subaccountId: id,
    page: Number.isFinite(page) ? String(page) : "1",
    limit: Number.isFinite(limit) ? String(limit) : "20",
    search,
    status,
    stage,
  });

  const response = await fetchFromApi<ContactsResponse>(`/api/contacts?${query.toString()}`);
  const contacts = response?.data ?? [];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold tracking-tight text-reno-text-1">Contacts</h2>
        <p className="text-sm text-reno-text-2">Subaccount-level contact and pipeline management</p>
      </section>

      <SurfaceCard className="p-4">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-2" />
            <FieldInput aria-label="Search contacts" className="pl-9" defaultValue={search} placeholder="Search contacts..." />
          </div>

          <FieldSelect aria-label="State filter" defaultValue="">
            <option value="">State</option>
            <option value="nv">Nevada</option>
            <option value="ca">California</option>
          </FieldSelect>

          <FieldSelect aria-label="Trade filter" defaultValue="">
            <option value="">Trade</option>
            <option value="roofing">Roofing</option>
            <option value="plumbing">Plumbing</option>
            <option value="hvac">HVAC</option>
          </FieldSelect>

          <FieldSelect aria-label="Status filter" defaultValue={status}>
            <option value="">Status</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="REPLIED">Replied</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="BOOKED">Booked</option>
            <option value="DNC">DNC</option>
          </FieldSelect>

          <SecondaryButton className="w-full lg:w-auto">
            <Filter size={15} />
            Apply
          </SecondaryButton>
        </div>
      </SurfaceCard>

      <SurfaceCard className="overflow-hidden">
        {contacts.length === 0 ? (
          <div className="p-5">
            <EmptyState
              title="No contacts found"
              detail="Import or create contacts for this subaccount to start tracking pipeline activity."
            />
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 bg-[rgba(8,13,24,0.88)] text-left text-xs uppercase tracking-[0.08em] text-reno-text-3">
                  <tr>
                    <th className="px-5 py-3 font-medium">Business</th>
                    <th className="px-5 py-3 font-medium">Contact</th>
                    <th className="px-5 py-3 font-medium">Phone</th>
                    <th className="px-5 py-3 font-medium">City</th>
                    <th className="px-5 py-3 font-medium">State</th>
                    <th className="px-5 py-3 font-medium">Trade</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="border-t border-white/6 transition-colors hover:bg-white/[0.03]">
                      <td className="px-5 py-3 font-medium text-reno-text-1">{contact.businessName}</td>
                      <td className="px-5 py-3 text-reno-text-2">{contact.contactName ?? "-"}</td>
                      <td className="num-tabular px-5 py-3 text-reno-text-2">{contact.phone}</td>
                      <td className="px-5 py-3 text-reno-text-2">{contact.city ?? "-"}</td>
                      <td className="px-5 py-3 text-reno-text-2">{contact.state ?? "-"}</td>
                      <td className="px-5 py-3 text-reno-text-2">{contact.trade ?? "-"}</td>
                      <td className="px-5 py-3">
                        <StatusBadge tone={toneForStatus(contact.status)}>{toLabel(contact.status)}</StatusBadge>
                      </td>
                      <td className="px-5 py-3 text-reno-text-2">{toLabel(contact.stage)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 p-4 md:hidden">
              {contacts.map((contact) => (
                <div key={`${contact.id}-mobile`} className="glass-card block w-full p-4 text-left">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="font-semibold text-reno-text-1">{contact.businessName}</p>
                    <StatusBadge tone={toneForStatus(contact.status)}>{toLabel(contact.status)}</StatusBadge>
                  </div>
                  <p className="text-sm text-reno-text-2">{contact.contactName ?? "No contact name"}</p>
                  <p className="num-tabular mt-1 text-sm text-reno-text-2">{contact.phone}</p>
                  <p className="mt-2 text-sm text-reno-text-3">
                    {[contact.city, contact.state].filter(Boolean).join(", ") || "Location unavailable"}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </SurfaceCard>
    </div>
  );
}
