import {z} from "zod"

const MB_TO_BYTES = 1024 * 1024;

export const postImageFileValidator = z.instanceof(File)
  .refine(file => {
      const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        ACCEPTED_MIME_TYPES.includes(file.type);
  }, "PICTURE_MUST_BE_JPG_JPEG_PNG, WEBP, PNG")
  .refine(file => file.size <= 50 * MB_TO_BYTES, "LIMIT_FILE_SIZE (Max 50MB)").optional();


export const PostSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title cannot be more than 100 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    categoryId: z.number().int().positive("Category ID must be a positive integer"),
    postImage: postImageFileValidator
});

export type createPostRequest = z.infer<typeof PostSchema>


export const UpdatePostSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title cannot be more than 100 characters").optional(),
    content:z.string().min(10, "Name must be atleast 2 characters").optional(), 
    categoryId: z.number().int().positive("Category ID must be a positive integer").optional(),
    published :z.boolean().optional(),
})

export type UpdatePostRequest = z.infer<typeof UpdatePostSchema>