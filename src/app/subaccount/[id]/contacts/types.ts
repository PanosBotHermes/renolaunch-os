export type ContactStatusValue =
  | "NEW"
  | "CONTACTED"
  | "REPLIED"
  | "QUALIFIED"
  | "BOOKED"
  | "DNC";

export type PipelineStageValue =
  | "NEW_LEAD"
  | "CONTACTED"
  | "REPLIED"
  | "QUALIFIED"
  | "BOOKED"
  | "CLOSED";

export interface ContactListItem {
  id: string;
  businessName: string;
  contactName: string | null;
  phone: string;
  city: string | null;
  state: string | null;
  trade: string | null;
  status: ContactStatusValue;
  stage: PipelineStageValue;
  createdAt: string;
  notes?: string | null;
}
