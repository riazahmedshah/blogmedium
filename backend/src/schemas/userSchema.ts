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
    name:z.string().min(2, "Name must be atleast 2 characters").max(20, "Name cannot be more that 20 characters").optional(),
    role:z.string().optional()
});

export const userProfilePhotoSchema = z.object({
    profilePhoto: z.object({
        mimetype: z.string().refine((mimetype) => {
            return ["image/jpeg", "image/png"].includes(mimetype)
        },"PICTURE_MUST_BE_JPG_JPEG_PNG"),
        size: z.number().max(5 * 1024 * 1024, "LIMIT_FILE_SIZE")
    })
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema> 

