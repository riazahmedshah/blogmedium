import zod, { string } from 'zod';

export const signupInputs = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    name: zod.string().optional()
})

export type SignupInput = zod.infer<typeof signupInputs> // introducing this because frontend can also understand the types



export const signinInputs = zod.object({
    email: zod.string().email(),
    password: zod.string(),
})

export type SigninInput = zod.infer<typeof signinInputs> // introducing this because frontend can also understand the types


export const createBlogInput = zod.object({
    title : zod.string(),
    content :zod.string()
});

export type CreateBlogInput = zod.infer<typeof createBlogInput>


export const updateBlogInput = zod.object({
    title : zod.string(),
    content : zod.string(),
    id : zod.string()
});

export type UpdateBlogInput = zod.infer<typeof updateBlogInput>