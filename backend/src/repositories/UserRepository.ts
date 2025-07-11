import { Prisma } from "@prisma/client";
import { ExtendedPrismaClient } from "../config/db";


export async function createUser(
    prisma: ExtendedPrismaClient,
    createUserInput: Omit<Prisma.UserCreateInput, 'posts'>
){
    return await prisma.user.create({
        data: {
            name:createUserInput.name,
            email:createUserInput.email,
            password:createUserInput.password,
            role:createUserInput.role,
        }
    });
}


export async function getUserByEmail(
    prisma: ExtendedPrismaClient,
    email:string
){
    return await prisma.user.findFirst({
        where: {
            email
        }
    });
}


export async function getUserById(
    prisma: ExtendedPrismaClient,
    id:number
){
    return await prisma.user.findFirst({
        where: {
            id
        }
    });
}

export async function updateUser(
    prisma: ExtendedPrismaClient,
    updateUserInput: Prisma.UserUpdateInput,
    id: number
){
    return await prisma.user.update({
        where: {
            id
        },
        data:{
            name:updateUserInput.name,
            role:updateUserInput.role,
            profilePhoto:updateUserInput.profilePhoto

        }
    });
}

export async function deleteUser(
    prisma: ExtendedPrismaClient,
    id:number
){
    return await prisma.user.delete({
        where: {
            id
        }
    });
}