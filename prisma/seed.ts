import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../generated/prisma/client";
import { hashPassword } from "../lib/password";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const email = process.env.SEED_OWNER_EMAIL ?? "owner@kosanpay.id";
  const password = process.env.SEED_OWNER_PASSWORD ?? "owner123";
  const name = process.env.SEED_OWNER_NAME ?? "Owner KosanPay";

  await prisma.owner.upsert({
    where: { email },
    update: {
      name,
      passwordHash: hashPassword(password),
    },
    create: {
      email,
      name,
      passwordHash: hashPassword(password),
    },
  });

  console.log(`Seeded owner: ${email}`);
  console.log(`Default password: ${password}`);
}

main()
  .catch((error) => {
    console.error("Failed to seed owner", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
