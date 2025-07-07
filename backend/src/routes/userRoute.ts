import { Hono }  from "hono"

import { CreateUser, login, UpdateUser } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";


export const userRoute = new Hono();

userRoute.post("/create", CreateUser);
userRoute.post("/signin", login);
userRoute.put("/update", authMiddleware, UpdateUser);
