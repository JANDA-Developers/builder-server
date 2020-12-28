"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlUpload = void 0;
require("reflect-metadata");
// import * as FileType from "file-type";
const graphql_1 = require("graphql");
exports.GqlUpload = new graphql_1.GraphQLScalarType({
    name: "Upload",
    description: "The `Upload` scalar type represents a file upload.",
    async parseValue(value) {
        const upload = await value;
        // const stream = upload.createReadStream();
        // const fileType = await FileType.fromStream(stream);
        // if (fileType?.mime !== upload.mimetype)
        //     throw new GraphQLError("Mime type does not match file content.");
        return upload;
    },
    parseLiteral(ast) {
        throw new graphql_1.GraphQLError("Upload literal unsupported.", ast);
    },
    serialize() {
        throw new graphql_1.GraphQLError("Upload serialization unsupported.");
    },
});
//# sourceMappingURL=Upload.scalar.js.map