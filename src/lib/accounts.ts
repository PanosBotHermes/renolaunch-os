export interface SubaccountOption {
  id: string;
  name: string;
}

export const subaccountOptions: SubaccountOption[] = [
  { id: "renolaunch", name: "RenoLaunch" },
];

export function getSubaccountName(id: string): string {
  const option = subaccountOptions.find((entry) => entry.id === id);
  if (option) return option.name;

  return id
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}
