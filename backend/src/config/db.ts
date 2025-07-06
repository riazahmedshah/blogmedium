import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>

export function createPrismaClient(databaseUrl: string) {
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is required')
  }
  return new PrismaClient({ datasourceUrl: databaseUrl })
    .$extends(withAccelerate())
}