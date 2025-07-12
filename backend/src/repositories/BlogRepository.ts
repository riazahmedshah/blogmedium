import { Prisma } from "@prisma/client";
import { ExtendedPrismaClient } from "../config/db";

export async function createBlog(
    prisma : ExtendedPrismaClient,
    createBlogInput: Prisma.PostUncheckedCreateInput
){
    return await prisma.post.create({
        data:{
            image:createBlogInput.image,
            title:createBlogInput.title,
            content:createBlogInput.content,
            categoryId:createBlogInput.categoryId,
            authorId:createBlogInput.authorId
        }
    });
}

export async function getAllBlogs(
    prisma : ExtendedPrismaClient,
    page: number = 1,
    perPage:number = 5
){
    return await prisma.post.findMany({
        skip:(page - 1) * perPage,
        take: perPage,
        orderBy:{
            createdAt: 'desc'
        }
    });
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
    id:string,
    updateBlogInput: Prisma.PostUpdateInput
){
    return await prisma.post.update({
        where:{
            id
        },
        data:{
            title: updateBlogInput.title,
            content: updateBlogInput.content,
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