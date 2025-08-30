import { Prisma } from "@prisma/client";
import { ExtendedPrismaClient } from "../config/db";

export async function createBlog(
    prisma: ExtendedPrismaClient,
    createBlogInput: Prisma.PostUncheckedCreateInput
) {
    return await prisma.post.create({
        data: {
            image: createBlogInput.image,
            title: createBlogInput.title,
            content: createBlogInput.content,
            categoryId: createBlogInput.categoryId,
            authorId: createBlogInput.authorId
        }
    });
}

export async function getAllBlogs(
    prisma: ExtendedPrismaClient,
    page: number = 1,
    perPage?: number
) {
    if (!perPage) {
        return await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: {
                    select: {
                        name: true,
                        role: true,
                        profilePhoto: true
                    }
                },
                category: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }
    return await prisma.post.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            author: {
                select: {
                    name: true,
                    role: true,
                    profilePhoto: true
                }
            },
            category: {
                select: {
                    name: true
                }
            }
        }
    });
}

interface Author {
    id: number;
    email: string;
    name: string;
    profilePhoto: string | null;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface Post {
    id: string;
    image: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: number;
    categoryId: number;
    author: Author;
}

export async function getBlogById(
    prisma: ExtendedPrismaClient,
    id: string
) {
    const mainBlog = await prisma.post.findUnique({
        where: {
            id: id,
        },
        include: {
            author: true,
        },
    });

    if (!mainBlog) {
        return {
            blog: null,
            recommendedBlogs: [],
        };
    }
    const recommendedBlogs = await prisma.post.findMany({
        where: {
            id: {
                not: id,
            },
        },
        include: {
            author: {
                select: {
                    name: true,
                    role: true,
                    profilePhoto: true,
                }
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 3,
    });
    return {
        blog: mainBlog as unknown as Post,
        recommendedBlogs: recommendedBlogs as unknown as Post[],
    };
}

export async function updateBlog(
    prisma: ExtendedPrismaClient,
    id: string,
    updateBlogInput: Prisma.PostUpdateInput
) {
    return await prisma.post.update({
        where: {
            id
        },
        data: {
            title: updateBlogInput.title,
            content: updateBlogInput.content,
            published: true
        }
    });
}
export async function deleteBlog(
    prisma: ExtendedPrismaClient,
    id: string
) {
    return await prisma.post.delete({
        where: {
            id
        }
    });
}

export async function getCategory(
    prisma: ExtendedPrismaClient
) {
    try {
        return await prisma.category.findMany();
    } catch (error) {
        console.error(error);
        throw error
    }
}

export async function getPostsByAuthorId(
    prisma: ExtendedPrismaClient,
    authorId: number
) {
    return await prisma.post.findMany({
        where: {
            authorId: authorId
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            category: true
        }
    });
}