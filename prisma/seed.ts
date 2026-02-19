import { Plan, PrismaClient, SubaccountStatus } from "@prisma/client";

const prisma = new PrismaClient();

const subaccounts = [
  {
    name: "Raymundo Tree Service",
    slug: "raymundo-tree",
    trade: "Tree Service",
    status: SubaccountStatus.ACTIVE,
    plan: Plan.PRO,
  },
  {
    name: "Monkey Business Tree Service",
    slug: "monkey-business-tree",
    trade: "Tree Service",
    status: SubaccountStatus.ACTIVE,
    plan: Plan.PRO,
  },
  {
    name: "Nations Best Roofing",
    slug: "nations-best-roofing",
    trade: "Roofing",
    status: SubaccountStatus.ACTIVE,
    plan: Plan.PRO,
  },
  {
    name: "Created Bathrooms",
    slug: "created-bathrooms",
    trade: "Bathroom Remodeling",
    status: SubaccountStatus.ACTIVE,
    plan: Plan.PRO,
  },
  {
    name: "Tree Climber Unlimited",
    slug: "tree-climber-unlimited",
    trade: "Tree Service",
    status: SubaccountStatus.ACTIVE,
    plan: Plan.PRO,
  },
  {
    name: "Heartland Tree Service",
    slug: "heartland-tree",
    trade: "Tree Service",
    status: SubaccountStatus.ACTIVE,
    plan: Plan.PRO,
  },
] as const;

async function main() {
  for (const subaccount of subaccounts) {
    await prisma.subaccount.upsert({
      where: { slug: subaccount.slug },
      update: {
        name: subaccount.name,
        trade: subaccount.trade,
        status: subaccount.status,
        plan: subaccount.plan,
      },
      create: {
        name: subaccount.name,
        slug: subaccount.slug,
        trade: subaccount.trade,
        status: subaccount.status,
        plan: subaccount.plan,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
