import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.REGION || "ap-southeast-1",
    endpoint: process.env.ENDPOINT,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID || "",
        secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
    },
    forcePathStyle: true,
});

export async function uploadToS3(file: File, folder: string = "images"): Promise<string> {
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const fileName = `${folder}/${timestamp}-${randomString}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET || "martin",
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
        });

        await s3Client.send(command);

        const publicUrl = `${process.env.ENDPOINT}/${process.env.BUCKET}/${fileName}`;
        return publicUrl;
    } catch (error) {
        console.error("S3 upload error:", error);
        throw new Error("Failed to upload file to S3");
    }
}

export async function uploadBufferToS3(
    buffer: Buffer, 
    contentType: string, 
    folder: string = "images",
    originalFileName: string = "file"
): Promise<string> {
    try {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const fileName = `${folder}/${timestamp}-${randomString}-${originalFileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET || "martin",
            Key: fileName,
            Body: buffer,
            ContentType: contentType,
        });

        await s3Client.send(command);

        const publicUrl = `${process.env.ENDPOINT}/${process.env.BUCKET}/${fileName}`;
        return publicUrl;
    } catch (error) {
        console.error("S3 upload error:", error);
        throw new Error("Failed to upload buffer to S3");
    }
}
