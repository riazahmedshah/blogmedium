import {z} from "zod"


export const UserSchema = z.object({
    name:z.string().min(2, "Name must be atleast 2 characters").max(20, "Name cannot be more that 20 characters"),
    email:z.string().email("Email is Required"),
    password:z.string().length(6,"password must be 6 charecters only"),
    role:z.string().optional()
});

export type SignupInput = z.infer<typeof UserSchema> 

export const SigninSchema = z.object({
    email:z.string().email("Email is Required"),
    password:z.string().length(6,"password must be 6 charecters only"),
})

export type SigninInput = z.infer<typeof SigninSchema>

export const UpdateUserSchema = z.object({
    name:z.string().min(2, "Name must be atleast 2 characters").max(20, "Name cannot be more that 20 characters"),
    role:z.string()
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema> 

