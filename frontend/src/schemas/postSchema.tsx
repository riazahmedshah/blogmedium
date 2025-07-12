import {z} from "zod"

const MB_TO_BYTES = 1024 * 1024;

export const postImageFileValidator = z.instanceof(File)
  .refine(file => {
      const ACCEPTED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      return ACCEPTED_MIME_TYPES.includes(file.type);
  }, "PICTURE_MUST_BE_JPG_JPEG_PNG, WEBP, PNG")
  .refine(file => file.size <= 500 * MB_TO_BYTES, "LIMIT_FILE_SIZE (Max 500MB)");


export const PostSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title cannot be more than 100 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    published: z.boolean().optional(),
    authorId: z.number().int().positive("Author ID must be a positive integer"),
    categoryId: z.number().int().positive("Category ID must be a positive integer"),

    postImage: z.any()
        .superRefine((files, ctx) => {
            if (files === undefined || files === null) {
                return;
            }
            if (files instanceof FileList && files.length === 0) {
                 return;
            }

            if (!(files instanceof FileList) || files.length === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "An image file is required.",
                    path: ctx.path,
                });
                return;
            }

            const file = files[0];

            const result = postImageFileValidator.safeParse(file);

            if (!result.success) {
                result.error.errors.forEach(issue => {
                    ctx.addIssue({
                        ...issue,
                        path: ctx.path,
                    });
                });
            }
        })
        .optional()
});


export const UpdatePostSchema = z.object({
    tile:z.string().min(2, "Name must be atleast 2 characters").max(20, "Name cannot be more that 20 characters"),
    content:z.string().min(10, "Name must be atleast 2 characters"), 
    published :z.boolean().optional(),
})

export type UpdateBlogInput = z.infer<typeof UpdatePostSchema>