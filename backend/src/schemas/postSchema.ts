import {z} from "zod"

const MB_TO_BYTES = 1024 * 1024;

export const postImageSchema = z.instanceof(File)
  .refine(file => {
      const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      return ACCEPTED_MIME_TYPES.includes(file.type);
  }, "PICTURE_MUST_BE_JPG_JPEG_PNG, WEBP, PNG")
  .refine((file) => {
    return file.size <= 500 * MB_TO_BYTES
}, "LIMIT_FILE_SIZE (Max 500MB)");

export const PostSchema = z.object({
    title:z.string().min(2, "Name must be atleast 2 characters").max(20, "Name cannot be more that 20 characters"),
    content:z.string().min(10, "Name must be atleast 2 characters"), 
    published :z.coerce.boolean().optional(),
    authorId:z.coerce.number().positive(),
    categoryId:z.coerce.number().positive(),
    image:z.string().optional()
})


export const UpdatePostSchema = z.object({
    tile:z.string().min(2, "Name must be atleast 2 characters").max(20, "Name cannot be more that 20 characters"),
    content:z.string().min(10, "Name must be atleast 2 characters"), 
    published :z.boolean().optional(),
})
