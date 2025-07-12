import { Context } from "hono";
import { getR2Client } from "../config/r2Client";
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { UpdateUserSchema, userProfilePhotoSchema } from "../schemas/userSchema";
import { ResponseHandler } from "../utils/ResponseHandler";
import { updateUser } from "../repositories/UserRepository";
import { createPrismaClient } from "../config/db";

export const update = async (c: Context) => {
    const userId = c.get("userId");
    const formData = await c.req.parseBody();
    const profilePhoto = formData['profilePhoto'];
    const dataToUpdate = {
        name: formData['name'] as string,
        role: formData['role'] as string,
    }

    if (!profilePhoto || !(profilePhoto instanceof File)) {
        return c.json({ error: 'No profile photo found or invalid file type provided.' }, 400);
    }

    const file: File = profilePhoto as File;

    const isValidPhotoSChema = userProfilePhotoSchema.safeParse(file);
    if (!isValidPhotoSChema.success) {
        return ResponseHandler.zodError(c, isValidPhotoSChema.error.errors);
    }

    

    const { success, data, error } = UpdateUserSchema.safeParse(dataToUpdate);
    if (!success) {
        return ResponseHandler.zodError(c, error.errors);
    }
    try {
        const r2Client = getR2Client({
            CLOUDFLARE_ACCOUNT_ID: c.env.CLOUDFLARE_ACCOUNT_ID,
            R2_ACCESS_KEY_ID: c.env.R2_ACCESS_KEY_ID,
            R2_SECRET_ACCESS_KEY: c.env.R2_SECRET_ACCESS_KEY,
        });
        const objectKey = `profile_images/${crypto.randomUUID()}-${file.name.replace(/\s+/g, '_')}`;

        const fileArrayBuffer = await file.arrayBuffer();
        const fileUnit8Array = new Uint8Array(fileArrayBuffer);
        const command = new PutObjectCommand({
            Bucket: "my-blog-images",
            Key: objectKey,
            Body: fileUnit8Array,
            ContentType: file.type,
        });

        const uploadResponse = await r2Client.send(command);
        console.log('R2 profile_image Upload successful:', uploadResponse);

        const publicUrl = `https://pub-51cab5eaf8c3402d808557eeaf36d4d1.r2.dev/${objectKey}`;

        const prisma = createPrismaClient(c.env?.DATABASE_URL);
        const updatedUser = await updateUser(prisma, { ...data, profilePhoto: publicUrl }, userId);
        return ResponseHandler.json(c, {
            updatedUser: updatedUser,
            objectKey: objectKey
        });
    } catch (error) {
        console.error('R2 Upload Error:', error);
        return ResponseHandler.error(c, error);
    }
}