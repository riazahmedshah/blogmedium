import { Context } from "hono";
import bcrypt from "bcryptjs"
import {sign} from "hono/jwt"

import { SigninSchema, UserSchema } from "../schemas/userSchema";
import { ResponseHandler } from "../utils/ResponseHandler";
import { createUser, getUserByEmail } from "../repositories/UserRepository";
import { createPrismaClient } from "../config/db";

export const create = async(c: Context) => {
    const body = await c.req.json();

    const {success, data, error} = UserSchema.safeParse(body);
    if(!success){
        return ResponseHandler.zodError(c,error.errors);
    }
    try {
        const prisma = createPrismaClient(c.env?.DATABASE_URL)
        const isUserExist = await getUserByEmail(prisma,data.email);
        if(!isUserExist){
            const hashPassword = await bcrypt.hash(data.password,10);
            const newUser = await createUser(prisma, {...data, password:hashPassword});
            return ResponseHandler.created(c,{newUser})
        } else{
            return ResponseHandler.json(c,{
                message:"USER_ALREADY_EXISTS"
            },403)
        }
    } catch (error) {
        console.error(error);
        return ResponseHandler.error(c, error);
    }
    
}

export const login = async (c:Context) => {
    const body = await c.req.json();
    
    const {success, data, error} = SigninSchema.safeParse(body);
    if(!success){
        return ResponseHandler.zodError(c,error.errors);
    }
    try {
        const prisma = createPrismaClient(c.env?.DATABASE_URL);
        const user = await getUserByEmail(prisma, data.email);
        if(user){
            const isPassMatch = await bcrypt.compare(data.password, user.password);
            if(!isPassMatch) return ResponseHandler.json(c,{
                message:"INVALID_PASSWORD"
            },401);

            const token = await sign({
                id:user.id,
                exp: Math.floor(Date.now()/1000) + 60 * 60
            },"secret",);

            return ResponseHandler.json(c,{token})

        } else{
            return ResponseHandler.json(c,{
                message:"USER_NOT_FOUND"
            },404)
        }
    } catch (error) {
        console.error(error)
        return ResponseHandler.error(c,error)
    }
}