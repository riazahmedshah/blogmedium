import { Hono }  from "hono"

import { create, login, me } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { update } from "../controllers/UpdateUserController";
import { getBlogByAuthor } from "../controllers/BlogController";


export const userRoute = new Hono();

userRoute.post("/create", create);
userRoute.post("/signin", login);
userRoute.put("/update", authMiddleware, update);
userRoute.get("/me", authMiddleware, me);
userRoute.get('/blogs', authMiddleware, getBlogByAuthor);
