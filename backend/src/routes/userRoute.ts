import { Hono }  from "hono"

import { create, login, update } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";


export const userRoute = new Hono();

userRoute.post("/create", create);
userRoute.post("/signin", login);
userRoute.put("/update", authMiddleware, update);
