export interface SubaccountOption {
  id: string;
  name: string;
  trade: string;
}

export const subaccountOptions: SubaccountOption[] = [
  { id: "raymundo-tree", name: "Raymundo Tree Service", trade: "Tree Service" },
  { id: "monkey-business-tree", name: "Monkey Business Tree Service", trade: "Tree Service" },
  { id: "nations-best-roofing", name: "Nations Best Roofing", trade: "Roofing" },
  { id: "created-bathrooms", name: "Created Bathrooms", trade: "Bathroom Remodeling" },
  { id: "tree-climber-unlimited", name: "Tree Climber Unlimited", trade: "Tree Service" },
  { id: "heartland-tree", name: "Heartland Tree Service", trade: "Tree Service" },
  { id: "k-and-j-specialties", name: "K & J Specialties", trade: "Tree Service" },
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

export function getSubaccountTrade(id: string): string {
  return subaccountOptions.find((entry) => entry.id === id)?.trade ?? "—";
}
