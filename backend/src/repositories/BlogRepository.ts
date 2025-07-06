import { Prisma } from "@prisma/client";
import { ExtendedPrismaClient } from "../config/db";

export async function crateBlog(
    prisma : ExtendedPrismaClient,
    createBlogInput: Prisma.PostCreateInput
){
    return await prisma.post.create({
        data: createBlogInput
    });
}

export async function getAllBlogs(
    prisma : ExtendedPrismaClient,
){
    return await prisma.post.findMany();
}

export async function getBlogById(
    prisma : ExtendedPrismaClient,
    id:string
){
    return await prisma.post.findUnique({
        where:{
            id
        },
        include:{
            author:true
        }
    });
}

export async function updateBlog(
    prisma : ExtendedPrismaClient,
    updateBlogInput: Prisma.PostUpdateInput,
    id:string
){
    return await prisma.post.update({
        where:{
            id
        },
        data:{
            title: updateBlogInput.title,
            content: updateBlogInput.content,
            category: updateBlogInput.category,
            published: true
        }
    });
}
export async function deleteBlog(
    prisma : ExtendedPrismaClient,
    id:string
){
    return await prisma.post.delete({
        where:{
            id
        }
    });
}