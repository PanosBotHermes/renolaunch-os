"use client";

import { SendHorizontal, X } from "lucide-react";
import {
  FieldLabel,
  FieldSelect,
  FieldTextArea,
  PrimaryButton,
} from "@/components/prototype/primitives";
import type { ContactListItem } from "./types";

export function ContactDetailPanel({
  contact,
  onClose,
}: {
  contact: ContactListItem;
  onClose: () => void;
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Close contact panel"
        onClick={onClose}
        className="fixed inset-0 top-[60px] z-40 bg-black/40"
      />

      <aside className="glass-card fixed bottom-0 right-0 top-[60px] z-50 w-full max-w-md rounded-none rounded-l-card border-l border-white/10 p-5 shadow-2xl shadow-black/40">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-reno-text-1">
              {contact.contactName || contact.businessName}
            </h3>
            <p className="text-sm text-reno-text-2">Contact details and stage controls</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-secondary inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-reno-text-2 hover:text-reno-text-1"
          >
            <X size={15} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <FieldLabel htmlFor="status">Status</FieldLabel>
            <FieldSelect id="status" defaultValue={contact.status}>
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="REPLIED">Replied</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="BOOKED">Booked</option>
              <option value="DNC">DNC</option>
            </FieldSelect>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="pipeline-stage">Pipeline Stage</FieldLabel>
            <FieldSelect id="pipeline-stage" defaultValue={contact.stage}>
              <option value="OLD">Old Leads</option>
              <option value="NEW_LEAD">New Lead</option>
              <option value="CONTACTED">Contacted</option>
              <option value="REPLIED">Replied</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="BOOKED">Booked</option>
              <option value="CLOSED">Closed</option>
            </FieldSelect>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <FieldTextArea id="notes" rows={6} placeholder="Add notes..." defaultValue={contact.notes ?? ""} />
          </div>

          <PrimaryButton className="w-full justify-center">
            <SendHorizontal size={15} />
            Send SMS
          </PrimaryButton>
        </div>
      </aside>
    </>
  );
}
