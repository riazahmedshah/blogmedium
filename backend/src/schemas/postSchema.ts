import {z} from "zod"

export const PostSchema = z.object({
    tile:z.string().min(2, "Name must be atleast 2 characters").max(20, "Name cannot be more that 20 characters"),
    content:z.string().min(10, "Name must be atleast 2 characters"), 
    published :z.boolean().optional(),
    authorId:z.number().positive(),
    categoryId:z.number().positive()
})