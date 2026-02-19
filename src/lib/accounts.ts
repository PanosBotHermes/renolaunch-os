export interface SubaccountOption {
  id: string;
  name: string;
}

export const subaccountOptions: SubaccountOption[] = [
  { id: "renolaunch", name: "RenoLaunch" },
];

const subaccountNameCache = new Map<string, string>(
  subaccountOptions.map((option) => [option.id, option.name]),
);

export function formatSubaccountName(id: string): string {
  const option = subaccountOptions.find((entry) => entry.id === id);
  if (option) return option.name;

  return id
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export async function getSubaccountName(id: string): Promise<string> {
  const cached = subaccountNameCache.get(id);
  if (cached) return cached;

  try {
    const response = await fetch(`/api/subaccounts/${id}`, { cache: "no-store" });
    if (response.ok) {
      const data = (await response.json()) as {
        id?: string;
        slug?: string;
        name?: string;
      };
      if (data.name) {
        subaccountNameCache.set(id, data.name);
        if (data.id) subaccountNameCache.set(data.id, data.name);
        if (data.slug) subaccountNameCache.set(data.slug, data.name);
        return data.name;
      }
    }
  } catch {
    // Fall back to local slug formatter.
  }

  const fallback = formatSubaccountName(id);
  subaccountNameCache.set(id, fallback);
  return fallback;
}
