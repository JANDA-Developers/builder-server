"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadsResolver = void 0;
const type_graphql_1 = require("type-graphql");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const File_type_1 = require("../../models/File/File.type");
const typegoose_1 = require("@typegoose/typegoose");
const FileInfo_type_1 = require("../../api/Commons/shared/FileInfo.type");
const errorHandling_1 = require("../../helpers/errorHandling");
const apollo_server_express_1 = require("apollo-server-express");
const FileUploadsResponse = BaseResponse_type_1.GenerateArrayReturnResponse(File_type_1.File, "FileUploads");
let FileUploadsResolver = class FileUploadsResolver {
    async FileUploads(context, uploadInputs) {
        const response = new FileUploadsResponse();
        const session = await typegoose_1.mongoose.startSession();
        session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw new apollo_server_express_1.AuthenticationError("User not signed in!");
            }
            const date = new Date();
            const files = await Promise.all(uploadInputs.map((i) => i.s3Upload(user._id, date)));
            const fileInstances = await Promise.all(files.map(async (f) => {
                await errorHandling_1.validateClass(f);
                return new File_type_1.FileModel(f);
            }));
            const result = await Promise.all(fileInstances.map(async (f) => f.save({ session })));
            response.setData(result.map((r) => r.toObject()));
            await session.commitTransaction();
        }
        catch (error) {
            response.setError(error);
            await session.abortTransaction();
        }
        finally {
            session.endSession();
        }
        return response;
    }
};
__decorate([
    type_graphql_1.Mutation(() => FileUploadsResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("files", () => [FileInfo_type_1.FileInput])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], FileUploadsResolver.prototype, "FileUploads", null);
FileUploadsResolver = __decorate([
    type_graphql_1.Resolver()
], FileUploadsResolver);
exports.FileUploadsResolver = FileUploadsResolver;
//# sourceMappingURL=FileUploads.resolver.js.map