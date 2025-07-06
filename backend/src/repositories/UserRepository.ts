import { Prisma } from "@prisma/client";
import { ExtendedPrismaClient } from "../config/db";


export async function createUser(
    prisma: ExtendedPrismaClient,
    createUserInput: Prisma.UserCreateInput
){
    return await prisma.user.create({
        data: createUserInput
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
            role:updateUserInput.role
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