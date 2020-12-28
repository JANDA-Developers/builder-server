import AWS from "aws-sdk";
import { Stream } from "stream";

export const s3Upload = async (
    fileName: string,
    createReadStream: Stream | Buffer /*() => Stream*/
) => /*: Promise<AWS.S3.ManagedUpload> */ {
    return new AWS.S3.ManagedUpload({
        params: {
            ACL: "public-read",
            Bucket: process.env.S3_BUCKET_NAME || "",
            Key: new Date().getTime() + "_" + fileName, // File name you want to save as in S3
            Body: createReadStream, //createReadStream()
        },
    }).promise();
};
