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
    
    let publicProfilePhotoUrl: string | undefined;
    let uploadedObjectKey: string | undefined;

    if (profilePhoto instanceof File) {
        const file: File = profilePhoto;

        const isValidPhotoSChema = userProfilePhotoSchema.safeParse(file);
        if (!isValidPhotoSChema.success) {
            return ResponseHandler.zodError(c, isValidPhotoSChema.error.errors);
        }

        try {
            const r2Client = getR2Client({
                CLOUDFLARE_ACCOUNT_ID: c.env.CLOUDFLARE_ACCOUNT_ID,
                R2_ACCESS_KEY_ID: c.env.R2_ACCESS_KEY_ID,
                R2_SECRET_ACCESS_KEY: c.env.R2_SECRET_ACCESS_KEY,
            });
            uploadedObjectKey = `profile_images/${crypto.randomUUID()}-${file.name.replace(/\s+/g, '_')}`;

            const fileArrayBuffer = await file.arrayBuffer();
            const fileUnit8Array = new Uint8Array(fileArrayBuffer);
            const command = new PutObjectCommand({
                Bucket: "my-blog-images",
                Key: uploadedObjectKey,
                Body: fileUnit8Array,
                ContentType: file.type,
            });

            const uploadResponse = await r2Client.send(command);
            console.log('R2 profile_image Upload successful:', uploadResponse);

            publicProfilePhotoUrl = `https://pub-51cab5eaf8c3402d808557eeaf36d4d1.r2.dev/${uploadedObjectKey}`;

        } catch (error) {
            console.error('R2 Upload Error:', error);
            return ResponseHandler.error(c, error);
        }
    } else {
        console.log('No valid profile photo provided, skipping photo update.');
    }

    const dataToUpdate = {
        name: formData['name'] as string | undefined,
        role: formData['role'] as string | undefined,
    };

    const { success, data, error } = UpdateUserSchema.safeParse(dataToUpdate);
    if (!success) {
        return ResponseHandler.zodError(c, error.errors);
    }

    try {
        const prisma = createPrismaClient(c.env?.DATABASE_URL);
        
        const prismaUpdatePayload: {
            name?: string;
            role?: string;
            profilePhoto?: string | null; 
        } = {
            ...data,
        };

        if (publicProfilePhotoUrl !== undefined) {
            prismaUpdatePayload.profilePhoto = publicProfilePhotoUrl;
        } 
        // else if (formData['clearProfilePhoto'] === 'true') { // Example flag from frontend
        //     prismaUpdatePayload.profilePhoto = null;
        // }

        const updatedUser = await updateUser(prisma, prismaUpdatePayload, userId);
        
        return ResponseHandler.json(c, {
            updatedUser: updatedUser,
            objectKey: uploadedObjectKey
        });
    } catch (error) {
        console.error('Database Update Error:', error);
        return ResponseHandler.error(c, error);
    }
}