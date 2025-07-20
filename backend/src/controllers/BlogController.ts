import { Context } from "hono";
import { postImageSchema, PostSchema, UpdatePostSchema } from "../schemas/postSchema";
import { ResponseHandler } from "../utils/ResponseHandler";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, getPostsByAuthorId, updateBlog } from "../repositories/BlogRepository";
import { createPrismaClient } from "../config/db";
import { getR2Client } from "../config/r2Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const create = async (c:Context) => {
    const userId = c.get("userId");
    const formData = await c.req.parseBody();

    const postImage = formData['postImage'];

    if(!postImage || !(postImage instanceof File)){
        return c.json({ 
            error: 'No profile photo found or invalid file type provided.' 
        }, 400);
    }

    const file: File = postImage as File;

    const isValidPhotoSChema = postImageSchema.safeParse(file);
    if(!isValidPhotoSChema.success){
        return ResponseHandler.zodError(c, isValidPhotoSChema.error.errors);
    }

    const dataToUpdate = {
        title: formData['title'] as string,
        content: formData['content'] as string,
        authorId: formData['authorId'] as string,
        categoryId: formData['categoryId'] as string,
        published: formData['published'] as string
    }

    const {success, data, error} = PostSchema.safeParse(dataToUpdate);
    if(!success){
        return ResponseHandler.zodError(c,error.errors);
    }
    try {
        const r2Client = getR2Client({
            CLOUDFLARE_ACCOUNT_ID:c.env.CLOUDFLARE_ACCOUNT_ID,
            R2_ACCESS_KEY_ID:c.env.R2_ACCESS_KEY_ID,
            R2_SECRET_ACCESS_KEY:c.env.R2_SECRET_ACCESS_KEY
        });

        const objectKey = `post_images/${crypto.randomUUID()}-${file.name.replace(/\s+/g, '_')}`;

        const fileArrayBuffer = await file.arrayBuffer();
        const fileUnit8Array = new Uint8Array(fileArrayBuffer);
        const cammand = new PutObjectCommand({
            Bucket:"my-blog-images",
            Key:objectKey,
            Body: fileUnit8Array,
            ContentType: file.type
        });

        const uploadResponse = await r2Client.send(cammand);
        console.log('R2 post_img Upload successful:', uploadResponse);
        const publicUrl = `https://pub-51cab5eaf8c3402d808557eeaf36d4d1.r2.dev/${objectKey}`;

        const prisma = createPrismaClient(c.env?.DATABASE_URL);
        const blog = await createBlog(prisma,{
            image:publicUrl,
            title: data.title,
            content: data.content,
            authorId:userId,
            categoryId:data.categoryId
        });
        return ResponseHandler.created(c,{
            blog:blog,
            objectKey: objectKey
        });
    } catch (error) {
        return ResponseHandler.error(c,error)
    }
};

export const getBulk = async (c:Context) => {
    const page = Number(c.req.query('page')) || 1
    try {
        const prisma = createPrismaClient(c.env?.DATABASE_URL);
        const bulk = await getAllBlogs(prisma,page);
        return ResponseHandler.json(c,{
            data:bulk,
            pagination: { currentPage: page } 

        });
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

export const getBlogByAuthor = async (c:Context) => {
    const userId = c.get("userId")
    try {
        const prisma = createPrismaClient(c.env?.DATABASE_URL);
        const blogs = await getPostsByAuthorId(prisma, userId);
        return ResponseHandler.json(c,{
            blogs:blogs
        })
    } catch (error) {
        return ResponseHandler.error(c,error);
    }
}