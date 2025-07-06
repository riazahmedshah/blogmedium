import { Context } from "hono";
import { UserSchema } from "../schemas/userSchema";

export const CreateUser = async(c: Context) => {
    const body = await c.req.json();

    const {success, data, error} = UserSchema.safeParse(body);
    
}