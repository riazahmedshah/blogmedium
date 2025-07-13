import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { JwtTokenInvalid } from "hono/utils/jwt/types";

export const authMiddleware = async (c: Context, next: Next) => {
    const token = c.req.header("authorization");
    if (!token) {
        return c.json({ message: "Unauthorized" }, 401);
    }
    
    try {
        const decode = await verify(token, "secret");
        if (decode) {
            c.set("userId", decode.id);
            c.set("tokenId", decode.token)
            return await next();
        }
        return c.json({ message: "Invalid token payload" }, 401);
    } catch (error) {
        if (error instanceof JwtTokenInvalid) {
            return c.json({ message: "Invalid token" }, 400);
        }
        console.error(error);
        return c.json({ message: "Internal server error" }, 500);
    }
}