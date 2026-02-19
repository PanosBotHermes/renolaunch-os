'use client';
import { Filter, Search } from "lucide-react";
import { EmptyState, FieldInput, FieldSelect, SecondaryButton, SurfaceCard } from "@/components/prototype/primitives";

export default function AgencyContactsPage() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold text-reno-text-primary">Contacts</h2>
        <p className="text-sm text-reno-text-secondary">Centralized contact index across all clients</p>
      </section>

      <SurfaceCard className="p-4">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-reno-text-secondary" />
            <FieldInput aria-label="Search contacts" className="pl-9" />
          </div>

          <FieldSelect aria-label="Filter by state" defaultValue="">
            <option value="">State</option>
          </FieldSelect>

          <FieldSelect aria-label="Filter by trade" defaultValue="">
            <option value="">Trade</option>
          </FieldSelect>

          <FieldSelect aria-label="Filter by status" defaultValue="">
            <option value="">Status</option>
          </FieldSelect>

          <SecondaryButton className="w-full lg:w-auto">
            <Filter size={15} />
            Apply
          </SecondaryButton>
        </div>
      </SurfaceCard>

      <SurfaceCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-reno-bg/60 text-left text-xs uppercase tracking-wide text-reno-text-secondary">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">City</th>
                <th className="px-5 py-3 font-medium">State</th>
                <th className="px-5 py-3 font-medium">Trade</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Added</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="px-5 py-12">
                  <EmptyState
                    title="No contacts found"
                    detail="Contacts will appear after client lead sources are connected."
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-reno-border px-5 py-3 text-sm">
          <span className="text-reno-text-secondary">Page 1 of 1</span>
          <div className="flex gap-2">
            <SecondaryButton disabled>Previous</SecondaryButton>
            <SecondaryButton disabled>Next</SecondaryButton>
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}
