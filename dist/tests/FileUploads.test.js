"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imgUploadTest = void 0;
const gCall_1 = require("../test-utils/gCall");
const typegoose_1 = require("@typegoose/typegoose");
const testConn_1 = require("src/test-utils/testConn");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const mongodb_1 = require("mongodb");
const graphql_1 = require("graphql");
const apollo_server_express_1 = require("apollo-server-express");
const setup_1 = require("src/test-utils/setup");
beforeAll(async () => {
    await testConn_1.testConn(setup_1.dbUri, true);
});
afterAll(async () => {
    await typegoose_1.mongoose.connection.close();
});
// 아래 URL 참조...
// https://medium.com/@semur.nabiev/unit-test-file-uploads-in-your-apollo-graphql-server-766c7d07a605
exports.imgUploadTest = async (ownerId, inputs) => {
    const response = await gCall_1.gCall({
        source: graphql_1.print(apollo_server_express_1.gql `
            mutation uploads($files: [FileInput!]!) {
                FileUploads(files: $files) {
                    ok
                    errors {
                        code
                        message
                        details
                    }
                    data {
                        _id
                        name
                    }
                }
            }
        `),
        userId: ownerId,
        variableValues: { files: inputs },
    });
    console.log(response);
    return response;
};
it("UploadFile", async () => {
    const file1 = fs_1.default.createReadStream(path_1.resolve("src/tests/resources/testimg_01.jpg"));
    const file2 = fs_1.default.createReadStream(path_1.resolve("src/tests/resources/testimg_02.jpg"));
    const file3 = fs_1.default.createReadStream(path_1.resolve("src/tests/resources/testimg_03.jpg"));
    const file4 = fs_1.default.createReadStream(path_1.resolve("src/tests/resources/testimg_04.png"));
    const response = await exports.imgUploadTest(new mongodb_1.ObjectId("5f5201e6f192ed4fb8d00028"), [
        {
            upload: new Promise((resolve) => resolve({
                createReadStream: () => file1,
                stream: file1,
                filename: "테스트테스트.jpg",
                mimetype: `image/jpeg`,
            })),
            tags: [
                {
                    key: "level",
                    value: "AL",
                },
                {
                    key: "examtype",
                    value: "OPIC",
                },
            ],
        },
        {
            upload: new Promise((resolve) => resolve({
                createReadStream: () => file2,
                stream: file2,
                filename: "테스트4입니다.jpg",
                mimetype: `image/jpeg`,
            })),
            tags: [
                {
                    key: "level",
                    value: "IM3",
                },
                {
                    key: "examtype",
                    value: "OPIC",
                },
            ],
        },
        {
            upload: new Promise((resolve) => resolve({
                createReadStream: () => file3,
                stream: file3,
                filename: "testing_2.jpg",
                mimetype: `image/jpeg`,
            })),
            tags: [
                {
                    key: "level",
                    value: "IH",
                },
                {
                    key: "examtype",
                    value: "OPIC",
                },
            ],
        },
        {
            upload: new Promise((resolve) => resolve({
                createReadStream: () => file4,
                stream: file4,
                filename: "testing_4444.png",
                mimetype: `image/png`,
            })),
            tags: [
                {
                    key: "service",
                    value: "BK_LITE",
                },
            ],
        },
    ]);
    expect(response).toMatchObject({
        data: {
            FileUploads: {
                ok: true,
                errors: [],
                data: expect.any(Array),
            },
        },
    });
});
//# sourceMappingURL=FileUploads.test.js.map