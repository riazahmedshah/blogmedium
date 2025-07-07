import { Hono }  from "hono"
// import { sign, verify } from "hono/jwt";
import { CreateUser, login, updateUser } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";


export const userRoute = new Hono();

userRoute.post("/create", CreateUser);
userRoute.post("/signin", login);
userRoute.put("/update", authMiddleware, updateUser);
