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
exports.PostModel = exports.Post = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const CollectionData_type_1 = require("../../helpers/CollectionData.type");
const User_model_1 = require("../../models/User/User.model");
const sortDecorator_1 = require("../../helpers/decorators/sortDecorator");
const Category_model_1 = require("../../models/Category/Category.model");
const FilterDecorators_1 = require("../../helpers/decorators/FilterInputGen/FilterDecorators");
const mongodb_1 = require("mongodb");
let Post = class Post extends CollectionData_type_1.CollectionDataInterface {
};
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    FilterDecorators_1.ValueFilter(["in", "not_in", "contains"], () => String),
    sortDecorator_1.Sorting(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    type_graphql_1.Field(() => User_model_1.User),
    typegoose_1.prop({ ref: () => User_model_1.User, required: true }),
    __metadata("design:type", Object)
], Post.prototype, "author", void 0);
__decorate([
    type_graphql_1.Field(() => Category_model_1.Category, { nullable: true }),
    FilterDecorators_1.ValueFilter(["in", "not_in"], () => mongodb_1.ObjectId),
    typegoose_1.prop({ ref: () => Category_model_1.Category }),
    __metadata("design:type", Object)
], Post.prototype, "category", void 0);
Post = __decorate([
    type_graphql_1.ObjectType({
        implements: CollectionData_type_1.CollectionDataInterface,
    }),
    typegoose_1.modelOptions({
        schemaOptions: {
            timestamps: true,
            collection: "Post",
        },
        options: {
            allowMixed: 0,
        },
    })
], Post);
exports.Post = Post;
FilterDecorators_1.ValueFilter(["eq", "in", "not_in"], () => mongodb_1.ObjectId)(Post.prototype, "_id");
FilterDecorators_1.ValueFilter(["lte", "lt", "gte", "gt"], () => Date)(Post.prototype, "createdAt");
sortDecorator_1.Sorting()(Post.prototype, "createdAt");
sortDecorator_1.Sorting()(Post.prototype, "updatedAt");
exports.PostModel = typegoose_1.getModelForClass(Post);
//# sourceMappingURL=Post.model.js.map