/**
 * GHL sub-account token + location mapping.
 * Server-side only — never import in 'use client' files.
 */
export interface GHLAccount {
  token: string;
  locationId: string;
}

export const GHL_ACCOUNTS: Record<string, GHLAccount> = {
  "raymundo-tree": {
    token: "pit-471bf493-4b90-4113-aa3b-d62219340d37",
    locationId: "XlTbBkKwVlqixHNnRmbA",
  },
  "monkey-business-tree": {
    token: "pit-d367c1ae-9ecd-4934-a53a-54021ae2ae5d",
    locationId: "Y5IyJbJTsXuDjh3x1wcD",
  },
  "nations-best-roofing": {
    token: "pit-8602ddf0-ba7a-496b-bfe8-a9609a8b98ef",
    locationId: "nW0mUXxKil3IKC3M8nui",
  },
  "tree-climber-unlimited": {
    token: "pit-2153a186-af4a-4e45-b117-33b4bec58083",
    locationId: "virlc7vela93GvEMdHM9",
  },
  // These three share the RenoLaunch agency account token
  "heartland-tree": {
    token: "pit-8cc9311d-eb00-46e1-9e82-ae63f0e0f679",
    locationId: "gg0Zfy2doliI50CmGcHz",
  },
  "created-bathrooms": {
    token: "pit-8cc9311d-eb00-46e1-9e82-ae63f0e0f679",
    locationId: "gg0Zfy2doliI50CmGcHz",
  },
  "k-and-j-specialties": {
    token: "pit-8cc9311d-eb00-46e1-9e82-ae63f0e0f679",
    locationId: "gg0Zfy2doliI50CmGcHz",
  },
};

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_HEADERS = {
  "Version": "2021-07-28",
  "Accept": "application/json",
  "Content-Type": "application/json",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
};

export async function ghlGet(path: string, token: string) {
  const res = await fetch(`${GHL_BASE}${path}`, {
    headers: { ...GHL_HEADERS, Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json() as Promise<Record<string, unknown>>;
}

export async function ghlPost(path: string, token: string, body: Record<string, unknown>) {
  const res = await fetch(`${GHL_BASE}${path}`, {
    method: "POST",
    headers: { ...GHL_HEADERS, Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GHL ${res.status}: ${text}`);
  }
  return res.json() as Promise<Record<string, unknown>>;
}

/** Find a GHL contact by phone number. Returns GHL contact id or null. */
export async function findGHLContactByPhone(
  phone: string,
  locationId: string,
  token: string,
): Promise<string | null> {
  // Try duplicate search first (fastest)
  const data = await ghlGet(
    `/contacts/search/duplicate?locationId=${locationId}&number=${encodeURIComponent(phone)}`,
    token,
  );
  const contact = (data as { contact?: { id: string } } | null)?.contact;
  if (contact?.id) return contact.id;

  // Fallback: query search
  const search = await ghlGet(
    `/contacts/?locationId=${locationId}&query=${encodeURIComponent(phone)}&limit=1`,
    token,
  );
  const contacts = (search as { contacts?: Array<{ id: string }> } | null)?.contacts ?? [];
  return contacts[0]?.id ?? null;
}

/** Get or find the first GHL conversation for a contact. Returns GHL conversation id or null. */
export async function findGHLConversation(
  ghlContactId: string,
  locationId: string,
  token: string,
): Promise<string | null> {
  const data = await ghlGet(
    `/conversations/search?locationId=${locationId}&contactId=${ghlContactId}&limit=1`,
    token,
  );
  const convos = (data as { conversations?: Array<{ id: string }> } | null)?.conversations ?? [];
  return convos[0]?.id ?? null;
}
