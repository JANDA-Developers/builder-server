"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Upload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.s3Upload = async (fileName, createReadStream /*() => Stream*/) => /*: Promise<AWS.S3.ManagedUpload> */ {
    return new aws_sdk_1.default.S3.ManagedUpload({
        params: {
            ACL: "public-read",
            Bucket: process.env.S3_BUCKET_NAME || "",
            Key: new Date().getTime() + "_" + fileName,
            Body: createReadStream,
        },
    }).promise();
};
//# sourceMappingURL=s3.js.map