import { db } from "@/lib/db";

export async function findSubaccountByIdOrSlug(idOrSlug: string) {
  return db.subaccount.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
    select: {
      id: true,
      slug: true,
      name: true,
    },
  });
}

export function formatSubaccountSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}
