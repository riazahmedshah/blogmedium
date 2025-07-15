import { Hono } from "hono";
import { create, Delete, get, getBulk, update } from "../controllers/BlogController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getCategories } from "../controllers/CategoryController";


export const blogRoute = new Hono();

blogRoute.get("/bulk", getBulk);
blogRoute.get("/categories", getCategories);
blogRoute.post("/create", authMiddleware, create);
blogRoute.put("/update/:id", authMiddleware, update);
blogRoute.get("/:id", authMiddleware, get);
blogRoute.delete("/delete/:id",authMiddleware, Delete);
