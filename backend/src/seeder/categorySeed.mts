import dotenv from "dotenv"

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

dotenv.config();

export type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

export function createPrismaClient(databaseUrl: string) {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required');
  }

  return new PrismaClient({ 
    datasourceUrl: databaseUrl,
    log: ['warn', 'error']
  }).$extends(withAccelerate());
}
const prisma = createPrismaClient(process.env.DATABASE_URL!);
async function main(){
  const categories = [
    { name: 'Technology' },
    { name: 'Programming' },
    { name: 'Frontend' },
    { name: 'Backend' },
    { name: 'personal' },
    { name: 'Javascript' },
    { name: 'Web3' },
    { name: 'AI' },
    { name: 'Full Stack'},
    { name: 'Computer Science'},
  ];

  const seed = await prisma.category.createMany({
    data:categories
  })
    
  }

  main()
  .catch((e) => {
    console.error('Category seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); // Disconnect Prisma client
  });
