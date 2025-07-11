import { Hono } from "hono";
import { create, Delete, get, getBulk, update } from "../controllers/BlogController";


export const blogRoute = new Hono();

blogRoute.post("/create", create);
blogRoute.put("/update/:id", update);
blogRoute.get("/bulk", getBulk);
blogRoute.get("/:id", get);
blogRoute.delete("/delete/:id",Delete);
