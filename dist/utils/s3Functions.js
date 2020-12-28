"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_TYPE = exports.getFileType = exports.uploadToS3 = void 0;
const aws_sdk_1 = require("aws-sdk");
exports.uploadToS3 = async (upload, { filename, tagSet, }) => {
    // TODO: 여기서 업로드 하기 ㅎㅎ
    const tags = [
        {
            Key: "mimetype",
            Value: upload.mimetype,
        },
        {
            Key: "filename",
            Value: upload.filename,
        },
        ...(tagSet ? tagSet : []),
    ];
    return new aws_sdk_1.S3.ManagedUpload({
        params: {
            ACL: "public-read",
            Bucket: process.env.AWS_BUCKETNAME || "",
            Body: upload.createReadStream(),
            Key: filename || upload.filename,
        },
        tags,
    }).promise();
};
exports.getFileType = (filename) => {
    const extension = filename.split(".").pop() || "";
    if (exports.FILE_TYPE.AUDIO.includes(extension)) {
        return "AUDIO";
    }
    else if (exports.FILE_TYPE.IMAGE.includes(extension)) {
        return "IMAGE";
    }
    else if (exports.FILE_TYPE.VIDEO.includes(extension)) {
        return "VIDEO";
    }
    else if (exports.FILE_TYPE.DOCUMENT.includes(extension)) {
        return "DOCUMENT";
    }
    else {
        return undefined;
    }
};
exports.FILE_TYPE = {
    AUDIO: ["mp3", "wav", "wma"],
    IMAGE: ["png", "jpg", "jpeg"],
    VIDEO: ["mp4"],
    DOCUMENT: ["pdf"],
};
//# sourceMappingURL=s3Functions.js.map