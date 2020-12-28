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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModel = exports.File = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
const FileInfo_type_1 = require("../../api/Commons/shared/FileInfo.type");
const CollectionData_type_1 = require("../../helpers/CollectionData.type");
const mongoSchemaConstants_1 = require("../../helpers/mongoSchemaConstants");
const objectUtils_1 = require("../../utils/objectUtils");
const s3Functions_1 = require("../../utils/s3Functions");
const User_model_1 = require("../../models/User/User.model");
let File = class File extends CollectionData_type_1.CollectionDataInterface {
    constructor() {
        super();
        this.fileType = () => s3Functions_1.getFileType(this.extension);
    }
    get tags() {
        return objectUtils_1.mapToArr(this.mTag);
    }
    async owner() {
        return User_model_1.UserModel.findById(this.ownerId);
    }
};
__decorate([
    type_graphql_1.Field(() => String),
    typegoose_1.prop(),
    __metadata("design:type", String)
], File.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], File.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typegoose_1.prop(),
    __metadata("design:type", String)
], File.prototype, "extension", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", Object)
], File.prototype, "fileType", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typegoose_1.prop(),
    class_validator_1.IsUrl(),
    __metadata("design:type", String)
], File.prototype, "uri", void 0);
__decorate([
    type_graphql_1.Field(() => [FileInfo_type_1.GqlTag]),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [])
], File.prototype, "tags", null);
__decorate([
    type_graphql_1.Field(() => User_model_1.User),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], File.prototype, "owner", null);
__decorate([
    typegoose_1.prop(),
    class_validator_1.IsDefined(),
    __metadata("design:type", mongodb_1.ObjectId)
], File.prototype, "ownerId", void 0);
__decorate([
    typegoose_1.prop(mongoSchemaConstants_1.PROP_OPT_FOR_MAP),
    class_validator_1.IsDefined(),
    __metadata("design:type", Map)
], File.prototype, "mTag", void 0);
File = __decorate([
    type_graphql_1.ObjectType({
        description: "S3 업로드된 파일...",
        implements: CollectionData_type_1.CollectionDataInterface,
    }),
    typegoose_1.modelOptions({
        schemaOptions: {
            timestamps: true,
            collection: "File",
        },
        options: {
            allowMixed: 0,
        },
    }),
    __metadata("design:paramtypes", [])
], File);
exports.File = File;
exports.FileModel = typegoose_1.getModelForClass(File);
//# sourceMappingURL=File.type.js.map