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
exports.CategoryUpdateResolver = exports.CategoryUpdateInput = void 0;
const type_graphql_1 = require("type-graphql");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const Category_model_1 = require("../../models/Category/Category.model");
const typegoose_1 = require("@typegoose/typegoose");
const errorHandling_1 = require("../../helpers/errorHandling");
const mongodb_1 = require("mongodb");
const apollo_server_express_1 = require("apollo-server-express");
const User_model_1 = require("../../models/User/User.model");
const CategoryUpdateResponse = BaseResponse_type_1.GenerateResponse(Category_model_1.Category, "CategoryUpdate");
let CategoryUpdateInput = class CategoryUpdateInput {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CategoryUpdateInput.prototype, "label", void 0);
__decorate([
    type_graphql_1.Field(() => Category_model_1.SuperClass, { nullable: true }),
    __metadata("design:type", Number)
], CategoryUpdateInput.prototype, "superClass", void 0);
CategoryUpdateInput = __decorate([
    type_graphql_1.InputType()
], CategoryUpdateInput);
exports.CategoryUpdateInput = CategoryUpdateInput;
let CategoryUpdateResolver = class CategoryUpdateResolver {
    async CategoryUpdate(context, categoryId, input) {
        const response = new CategoryUpdateResponse();
        const session = await typegoose_1.mongoose.startSession();
        session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw errorHandling_1.errorGenForUnexist("User");
            }
            const category = await Category_model_1.CategoryModel.findById(categoryId);
            if (!category) {
                throw new apollo_server_express_1.ApolloError("Unexist category id", "UNEXIST_CATEGORY");
            }
            for (const field in input) {
                if (Object.prototype.hasOwnProperty.call(input, field)) {
                    category[field] = input[field];
                }
            }
            await category.save({ session });
            response.setData(category);
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
    type_graphql_1.Authorized(User_model_1.UserRole.MEMBER),
    type_graphql_1.Mutation(() => CategoryUpdateResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id", () => mongodb_1.ObjectId)),
    __param(2, type_graphql_1.Arg("input", () => CategoryUpdateInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongodb_1.ObjectId,
        CategoryUpdateInput]),
    __metadata("design:returntype", Promise)
], CategoryUpdateResolver.prototype, "CategoryUpdate", null);
CategoryUpdateResolver = __decorate([
    type_graphql_1.Resolver()
], CategoryUpdateResolver);
exports.CategoryUpdateResolver = CategoryUpdateResolver;
//# sourceMappingURL=CategoryUpdate.resolver.js.map