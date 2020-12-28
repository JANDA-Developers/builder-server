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
exports.FileInput = exports.GqlTagInput = exports.GqlTag = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const File_type_1 = require("../../../models/File/File.type");
const Upload_scalar_1 = require("../../../types/scalars/Upload.scalar");
const dateUtils_1 = require("../../../utils/dateUtils");
const s3Functions_1 = require("../../../utils/s3Functions");
let GqlTag = class GqlTag {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
};
__decorate([
    type_graphql_1.Field(() => String),
    typegoose_1.prop(),
    __metadata("design:type", String)
], GqlTag.prototype, "key", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    typegoose_1.prop(),
    __metadata("design:type", String)
], GqlTag.prototype, "value", void 0);
GqlTag = __decorate([
    type_graphql_1.ObjectType("Tag", {
        description: "태그.. ㅜㅜ",
    }),
    __metadata("design:paramtypes", [String, String])
], GqlTag);
exports.GqlTag = GqlTag;
let GqlTagInput = class GqlTagInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], GqlTagInput.prototype, "key", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], GqlTagInput.prototype, "value", void 0);
GqlTagInput = __decorate([
    type_graphql_1.InputType()
], GqlTagInput);
exports.GqlTagInput = GqlTagInput;
let FileInput = class FileInput {
    async s3Upload(ownerId, date) {
        const upload = await this.upload;
        try {
            const uploadResult = await s3Functions_1.uploadToS3(upload, {
                // TODO: 파일 이름 앞에 prefix를 붙여서 중복검사를 할 필요 없게 만들자..
                filename: `${ownerId.toHexString()}/${dateUtils_1.formatDate(date || new Date(), "%y%m%d-%hh/%im%ss")}/${upload.filename}`,
                tagSet: this.tags.map((tag) => ({
                    Key: tag.key,
                    Value: tag.value,
                })),
            });
            const file = new File_type_1.File();
            file.uri = uploadResult.Location;
            file.name = upload.filename;
            file.extension = upload.filename.split(".").pop() || "";
            file.ownerId = ownerId;
            file.mTag = new Map();
            this.tags.forEach((tag) => {
                file.mTag.set(tag.key, tag.value);
            });
            return file;
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    }
};
__decorate([
    type_graphql_1.Field(() => Upload_scalar_1.GqlUpload),
    __metadata("design:type", Promise)
], FileInput.prototype, "upload", void 0);
__decorate([
    type_graphql_1.Field(() => [GqlTagInput], {
        defaultValue: [],
    }),
    __metadata("design:type", Array)
], FileInput.prototype, "tags", void 0);
FileInput = __decorate([
    type_graphql_1.InputType({
        description: "File upload to s3",
    })
], FileInput);
exports.FileInput = FileInput;
//# sourceMappingURL=FileInfo.type.js.map