import { Context } from "hono"
import { ResponseHandler } from "../utils/ResponseHandler"
import { getCategory } from "../repositories/BlogRepository"
import { createPrismaClient } from "../config/db";

export const getCategories = async(c:Context) => {
  try {
    const prisma = createPrismaClient(c.env?.DATABASE_URL);
    const categories = await getCategory(prisma);
    return ResponseHandler.json(c,categories);
  } catch (error) {
    return ResponseHandler.error(c,error)
  }
}