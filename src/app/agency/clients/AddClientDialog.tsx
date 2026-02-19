"use client";

import { FormEvent, useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  FieldInput,
  FieldLabel,
  PrimaryButton,
  SecondaryButton,
} from "@/components/prototype/primitives";

export interface ClientAccount {
  id: string;
  name: string;
  slug: string;
  trade: string | null;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  plan: "BASIC" | "PRO" | "AGENCY";
  healthScore: number;
  dailyLimit: number;
  _count: {
    contacts: number;
  };
}

interface AddClientDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: (client: ClientAccount) => void;
}

function initialFormState() {
  return {
    name: "",
    trade: "",
    contactName: "",
    contactEmail: "",
    dailyLimit: "500",
  };
}

export function AddClientDialog({ open, onClose, onCreated }: AddClientDialogProps) {
  const [form, setForm] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setForm(initialFormState());
      setSubmitting(false);
      setError(null);
    }
  }, [open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!form.name.trim()) {
      setError("Client name is required");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/subaccounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          trade: form.trade,
          contactName: form.contactName,
          contactEmail: form.contactEmail,
          dailyLimit: Number.parseInt(form.dailyLimit, 10),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? "Unable to create client");
      }

      const created = (await response.json()) as ClientAccount;
      onCreated(created);
      onClose();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to create client");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close add client dialog"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="glass-card w-full max-w-lg p-5 md:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-reno-text-1">Add Client</h3>
              <p className="mt-1 text-sm text-reno-text-2">Create a new subaccount for outreach.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary inline-flex h-11 w-11 items-center justify-center rounded-[10px] text-reno-text-2 hover:text-reno-text-1"
            >
              <X size={15} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <FieldLabel htmlFor="client-name">Client Name</FieldLabel>
              <FieldInput
                id="client-name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Raymundo Tree Service"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel htmlFor="client-trade">Trade</FieldLabel>
                <FieldInput
                  id="client-trade"
                  value={form.trade}
                  onChange={(event) => setForm((current) => ({ ...current, trade: event.target.value }))}
                  placeholder="Tree Service"
                />
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor="client-daily-limit">Daily Limit</FieldLabel>
                <FieldInput
                  id="client-daily-limit"
                  type="number"
                  min={1}
                  value={form.dailyLimit}
                  onChange={(event) => setForm((current) => ({ ...current, dailyLimit: event.target.value }))}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel htmlFor="client-contact-name">Contact Name</FieldLabel>
                <FieldInput
                  id="client-contact-name"
                  value={form.contactName}
                  onChange={(event) => setForm((current) => ({ ...current, contactName: event.target.value }))}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor="client-contact-email">Contact Email</FieldLabel>
                <FieldInput
                  id="client-contact-email"
                  type="email"
                  value={form.contactEmail}
                  onChange={(event) => setForm((current) => ({ ...current, contactEmail: event.target.value }))}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {error ? (
              <p className="rounded-input border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p>
            ) : null}

            <div className="flex flex-col-reverse gap-2 pt-1 md:flex-row md:justify-end">
              <SecondaryButton type="button" onClick={onClose} className="w-full md:w-auto">
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit" disabled={submitting} className="w-full md:w-auto">
                {submitting ? "Creating..." : "Create Client"}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
