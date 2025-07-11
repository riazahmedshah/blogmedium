import { Context } from "hono";
import { getR2Client } from "../config/r2Client";
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { userProfilePhotoSchema } from "../schemas/userSchema";
import { ResponseHandler } from "../utils/ResponseHandler";

export const update = async (c:Context) => {
    const body = await c.req.json();
    const filebody = await c.req.parseBody();
    const profilePhoto = filebody['Image'];

    if (!profilePhoto || !(profilePhoto instanceof File)) {
        return c.json({ error: 'No profile photo found or invalid file type provided.' }, 400);
    }

    const file: File = profilePhoto as File; 

    const { success, data, error} = userProfilePhotoSchema.safeParse(file);
    if(!success){
        return ResponseHandler.zodError(c,error.errors);
    }

    const r2Client = getR2Client({
        CLOUDFLARE_ACCOUNT_ID: c.env.CLOUDFLARE_ACCOUNT_ID,
        R2_ACCESS_KEY_ID: c.env.R2_ACCESS_KEY_ID,
        R2_SECRET_ACCESS_KEY: c.env.R2_SECRET_ACCESS_KEY,
    });

    const objectKey = `profile_images/${crypto.randomUUID()}-${file.name.replace(/\s+/g, '_')}`; // Replace spaces in filename

    const command = new PutObjectCommand({
        Bucket: c.env.BUCKET_BINDING_NAME.bucketName,
        Key: objectKey,
        Body: await file.arrayBuffer(),
        ContentType: file.type,
    });

    const uploadResponse = await r2Client.send(command);
    console.log('R2 Upload successful:', uploadResponse);

    const publicUrl = `https://pub-${c.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/${objectKey}`;
    return ResponseHandler.json(c,{
        imageUrl: publicUrl,
        objectKey: objectKey 
    });
}