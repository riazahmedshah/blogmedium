import { Context } from "hono";
import { PostSchema, UpdatePostSchema } from "../schemas/postSchema";
import { ResponseHandler } from "../utils/ResponseHandler";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../repositories/BlogRepository";
import { createPrismaClient } from "../config/db";

export const create = async (c:Context) => {
    const body = await c.req.json();
    const {success, data, error} = PostSchema.safeParse(body);
    if(!success){
        return ResponseHandler.zodError(c,error.errors);
    }
    try {
        const prisma = createPrismaClient(c.env?.DATABASE_URL);
        const blog = await createBlog(prisma,data);
        return ResponseHandler.created(c,blog);
    } catch (error) {
        return ResponseHandler.error(c,error)
    }
};

export const getBulk = async (c:Context) => {
    try {
        const prisma = createPrismaClient(c.env?.DATABASE_URL);
        const bulk = await getAllBlogs(prisma);
        return ResponseHandler.json(c,bulk);
    } catch (error) {
        return ResponseHandler.error(c,error)
    }
}

export const get = async (c:Context) => {
    const {id} = c.req.param()
    try {
        const prisma = createPrismaClient(c.env?.DATABASE_URL);
        const blog = await getBlogById(prisma,id);
        return ResponseHandler.json(c,{blog});
    } catch (error) {
        return ResponseHandler.error(c,error);
    }
}

export const update = async (c:Context) => {
    const {id} = c.req.param();
    const body = await c.req.json();
    const {success, data, error} = UpdatePostSchema.safeParse(body);
    if(!success){
        return ResponseHandler.zodError(c,error.errors);
    }
    try {
        const prisma = createPrismaClient(c.env?.DATABASE_URL);
        const updatedBlog = await updateBlog(prisma,id,data);
        return ResponseHandler.json(c,updatedBlog);
    } catch (error) {
        return ResponseHandler.error(c,error);
    }
}

export const Delete = async (c:Context) => {
    const {id} = c.req.param();
    try {
        const prisma = createPrismaClient(c.env?.DATABASE_URL);
        await deleteBlog(prisma,id);
        ResponseHandler.json(c,{
            message:"DELETED_SUCCESSFULLY"
        })
    } catch (error) {
        return ResponseHandler.error(c,error);
    }
}