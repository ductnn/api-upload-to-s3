import { config as dotenvConfig } from "dotenv";


dotenvConfig({
    path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env",
});

export const config = {
    node_env: process.env.NODE_ENV,
    serverPort: process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000,
    serverSslEnabled: process.env.SERVER_SSL == 'true',

    s3: {
        aws_access_key: process.env.AWS_ACCESS_KEY,
        aws_secret_key: process.env.AWS_SECRET_KEY,
        aws_region_default: process.env.AWS_REGION_DEFAULT,
        aws_bucket_name: process.env.AWS_BUCKET_NAME,
    },
};
