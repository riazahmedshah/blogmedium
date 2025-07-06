import { Context } from "hono";
import { UserSchema } from "../schemas/userSchema";
import { ResponseHandler } from "../utils/ResponseHandler";
import { createUser, getUserByEmail } from "../repositories/UserRepository";
import { createPrismaClient } from "../config/db";

export const CreateUser = async(c: Context) => {
    const body = await c.req.json();

    const {success, data, error} = UserSchema.safeParse(body);
    if(!success){
        return ResponseHandler.zodError(c,error.errors);
    }
    try {
        const prisma = createPrismaClient(c.env?.DATABASE_URL)
        const isUserExist = await getUserByEmail(prisma,data.email);
        if(!isUserExist){
            const newUser = await createUser(prisma,body);
            return ResponseHandler.created(c,newUser)
        } else{
            return ResponseHandler.json(c,{
                message:"USER_ALREADY_EXISTS"
            },403)
        }
    } catch (error) {
        return ResponseHandler.error(c, error);
    }
    
}