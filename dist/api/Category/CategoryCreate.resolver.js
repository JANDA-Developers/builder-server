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
exports.CategoryCreateResolver = exports.CategoryCreateArgs = void 0;
const Category_model_1 = require("../../models/Category/Category.model");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const errorHandling_1 = require("../../helpers/errorHandling");
const errorHandling_2 = require("../../helpers/errorHandling");
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const modelFunction_1 = require("../../utils/modelFunction");
const User_model_1 = require("../../models/User/User.model");
const CategoryCreateResponse = BaseResponse_type_1.GenerateResponse(Category_model_1.Category, "CategoryCreate");
let CategoryCreateArgs = class CategoryCreateArgs {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], CategoryCreateArgs.prototype, "label", void 0);
__decorate([
    type_graphql_1.Field(() => Category_model_1.SuperClass),
    __metadata("design:type", String)
], CategoryCreateArgs.prototype, "superClass", void 0);
CategoryCreateArgs = __decorate([
    type_graphql_1.ArgsType()
], CategoryCreateArgs);
exports.CategoryCreateArgs = CategoryCreateArgs;
let CategoryCreateResolver = class CategoryCreateResolver {
    async CategoryCreate(context, input) {
        const response = new CategoryCreateResponse();
        const session = await typegoose_1.mongoose.startSession();
        await session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw errorHandling_2.errorGenForUnexist("User");
            }
            const category = new Category_model_1.Category(input);
            await errorHandling_1.validateClass(category);
            const categoryInstance = modelFunction_1.getMongoInstance(Category_model_1.CategoryModel, category);
            await categoryInstance.save({ session });
            response.setData(categoryInstance.toObject());
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
    type_graphql_1.Mutation(() => CategoryCreateResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Args(() => CategoryCreateArgs)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CategoryCreateArgs]),
    __metadata("design:returntype", Promise)
], CategoryCreateResolver.prototype, "CategoryCreate", null);
CategoryCreateResolver = __decorate([
    type_graphql_1.Resolver()
], CategoryCreateResolver);
exports.CategoryCreateResolver = CategoryCreateResolver;
//# sourceMappingURL=CategoryCreate.resolver.js.map