import {z} from "zod"


export const registerSchema = z.object({
    name:z.string().min(2, "Name must be atleast 2 characters").max(20, "Name cannot be more that 20 characters"),
    email:z.string().email("Email is Required"),
    password:z.string().length(6,"password must be 6 charecters only"),
    role:z.string().optional()
});

export type signupRequestData = z.infer<typeof registerSchema>
 

export const signinSchema = z.object({
    email:z.string().email("Email is Required"),
    password:z.string().length(6,"password must be 6 charecters only"),
});
export type signinRequestData = z.infer<typeof signinSchema>



const MB_TO_BYTES = 1024 * 1024;
export const userProfilePhotoSchema = z.instanceof(File).refine((file) => {
    ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)
}, "PICTURE_MUST_BE_JPG_JPEG_PNG, WEBP, PNG").refine((file) => {
    file.size <= 5 * MB_TO_BYTES
},"LIMIT_FILE_SIZE (Max 50MB)").optional()

export const UpdateUserSchema = z.object({
    name:z.string().min(2, "Name must be atleast 2 characters").max(20, "Name cannot be more that 20 characters").optional(),
    role:z.string().optional(),
    profilePhoto:userProfilePhotoSchema
});

export type updateuserData = z.infer<typeof UpdateUserSchema> 

