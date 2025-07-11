import { Hono }  from "hono"

import { create, login } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { update } from "../controllers/UpdateUserController";


export const userRoute = new Hono();

userRoute.post("/create", create);
userRoute.post("/signin", login);
userRoute.put("/update", authMiddleware, update);
