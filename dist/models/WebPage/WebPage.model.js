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
exports.WebPageModel = exports.WebPage = exports.WebPageType = exports.Langs = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const CollectionData_type_1 = require("../../helpers/CollectionData.type");
const User_model_1 = require("../User/User.model");
const sortDecorator_1 = require("../../helpers/decorators/sortDecorator");
const FilterDecorators_1 = require("../../helpers/decorators/FilterInputGen/FilterDecorators");
const mongodb_1 = require("mongodb");
const generateRandomCode_1 = require("../../utils/generateRandomCode");
const graphql_type_json_1 = require("graphql-type-json");
var Langs;
(function (Langs) {
    Langs["KR"] = "KR";
    Langs["GB"] = "GB";
})(Langs = exports.Langs || (exports.Langs = {}));
var WebPageType;
(function (WebPageType) {
    WebPageType["PERSONAL"] = "PERSONAL";
    WebPageType["BUSI"] = "BUSI";
})(WebPageType = exports.WebPageType || (exports.WebPageType = {}));
let WebPage = class WebPage extends CollectionData_type_1.CollectionDataInterface {
};
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    FilterDecorators_1.ValueFilter(["in", "not_in", "contains", "eq"], () => String),
    __metadata("design:type", String)
], WebPage.prototype, "title", void 0);
__decorate([
    typegoose_1.prop(),
    FilterDecorators_1.ValueFilter(["in", "not_in", "contains", "eq"], () => String),
    type_graphql_1.Field({ nullable: true, description: "사용자 도메인 (프로토콜포함)" }),
    __metadata("design:type", String)
], WebPage.prototype, "domain", void 0);
__decorate([
    typegoose_1.prop(),
    type_graphql_1.Field(() => [String], { nullable: true }),
    FilterDecorators_1.ValueFilter(["in", "not_in", "contains", "eq"], () => String),
    __metadata("design:type", Array)
], WebPage.prototype, "keyWards", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], WebPage.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ default: () => generateRandomCode_1.generateRandomStringCode(6) }),
    __metadata("design:type", String)
], WebPage.prototype, "key", void 0);
__decorate([
    typegoose_1.prop(),
    type_graphql_1.Field({
        description: "이건 이넘없이 프론트에서 전달받은 키를 그대로 사용한다.",
    }),
    __metadata("design:type", String)
], WebPage.prototype, "templateKey", void 0);
__decorate([
    typegoose_1.prop(),
    type_graphql_1.Field(() => [Langs]),
    __metadata("design:type", Array)
], WebPage.prototype, "supportLanguage", void 0);
__decorate([
    typegoose_1.prop({ required: true, type: Object }),
    type_graphql_1.Field(() => graphql_type_json_1.GraphQLJSONObject),
    __metadata("design:type", Object)
], WebPage.prototype, "value", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], WebPage.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(() => User_model_1.User),
    typegoose_1.prop({ ref: "User", required: true }),
    FilterDecorators_1.ValueFilter(["eq", "in"], () => String),
    __metadata("design:type", Object)
], WebPage.prototype, "owner", void 0);
WebPage = __decorate([
    type_graphql_1.ObjectType({
        implements: CollectionData_type_1.CollectionDataInterface,
    }),
    typegoose_1.modelOptions({
        schemaOptions: {
            timestamps: true,
            collection: "WebPage",
        },
        options: {
            allowMixed: 0,
        },
    })
], WebPage);
exports.WebPage = WebPage;
FilterDecorators_1.ValueFilter(["eq", "in", "not_in"], () => mongodb_1.ObjectId)(WebPage.prototype, "_id");
FilterDecorators_1.ValueFilter(["lte", "lt", "gte", "gt"], () => Date)(WebPage.prototype, "createdAt");
sortDecorator_1.Sorting()(WebPage.prototype, "createdAt");
sortDecorator_1.Sorting()(WebPage.prototype, "updatedAt");
exports.WebPageModel = typegoose_1.getModelForClass(WebPage);
type_graphql_1.registerEnumType(WebPageType, {
    name: "WebPageType",
    description: "웹페이지의 역할",
});
type_graphql_1.registerEnumType(Langs, {
    name: "Langs",
    description: "언어목록",
});
//# sourceMappingURL=WebPage.model.js.map