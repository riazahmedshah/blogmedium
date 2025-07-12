import { S3Client } from "@aws-sdk/client-s3";

export interface r2ClientEnv{
    CLOUDFLARE_ACCOUNT_ID: string;
    R2_ACCESS_KEY_ID: string;
    R2_SECRET_ACCESS_KEY: string;
}

export function getR2Client(config: r2ClientEnv): S3Client {
  if (!config.CLOUDFLARE_ACCOUNT_ID || !config.R2_ACCESS_KEY_ID || !config.R2_SECRET_ACCESS_KEY) {
    throw new Error("Missing R2 client configuration values.");
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${config.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.R2_ACCESS_KEY_ID,
      secretAccessKey: config.R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
  });
}