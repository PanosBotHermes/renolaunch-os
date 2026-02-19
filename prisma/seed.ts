import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const subaccounts = [
  { name: "Raymundo Tree Service", slug: "raymundo-tree", trade: "Tree Service" },
  { name: "Monkey Business Tree Service", slug: "monkey-business-tree", trade: "Tree Service" },
  { name: "Nations Best Roofing", slug: "nations-best-roofing", trade: "Roofing" },
  { name: "Created Bathrooms", slug: "created-bathrooms", trade: "Bathroom Remodeling" },
  { name: "Tree Climber Unlimited", slug: "tree-climber-unlimited", trade: "Tree Service" },
  { name: "Heartland Tree Service", slug: "heartland-tree", trade: "Tree Service" },
];

async function main() {
  for (const s of subaccounts) {
    await db.subaccount.upsert({
      where: { slug: s.slug },
      update: { name: s.name, trade: s.trade },
      create: { name: s.name, slug: s.slug, trade: s.trade },
    });
    console.log(`✓ ${s.name}`);
  }
  console.log("\n✅ Seeded 6 subaccounts");
}

main().catch(console.error).finally(() => db.$disconnect());
