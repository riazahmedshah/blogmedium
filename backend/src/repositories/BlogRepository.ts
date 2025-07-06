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
export async function getBlogs(
    prisma : ExtendedPrismaClient,
    createBlogInput: Prisma.PostCreateInput
){
    return await prisma.post.create({
        data: createBlogInput
    });
}
export async function getBlogById(
    prisma : ExtendedPrismaClient,
    createBlogInput: Prisma.PostCreateInput
){
    return await prisma.post.create({
        data: createBlogInput
    });
}
export async function updateBlog(
    prisma : ExtendedPrismaClient,
    createBlogInput: Prisma.PostCreateInput
){
    return await prisma.post.create({
        data: createBlogInput
    });
}
export async function deleteBlog(
    prisma : ExtendedPrismaClient,
    createBlogInput: Prisma.PostCreateInput
){
    return await prisma.post.create({
        data: createBlogInput
    });
}