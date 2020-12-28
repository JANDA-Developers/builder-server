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
exports.PostCreateResolver = exports.PostCreateArgs = void 0;
const Post_model_1 = require("../../models/Post/Post.model");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const errorHandling_1 = require("../../helpers/errorHandling");
const errorHandling_2 = require("../../helpers/errorHandling");
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const modelFunction_1 = require("../../utils/modelFunction");
const mongodb_1 = require("mongodb");
const Category_model_1 = require("../../models/Category/Category.model");
const User_model_1 = require("../../models/User/User.model");
const PostCreateResponse = BaseResponse_type_1.GenerateResponse(Post_model_1.Post, "PostCreate");
let PostCreateArgs = class PostCreateArgs {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], PostCreateArgs.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], PostCreateArgs.prototype, "body", void 0);
PostCreateArgs = __decorate([
    type_graphql_1.ArgsType()
], PostCreateArgs);
exports.PostCreateArgs = PostCreateArgs;
let PostCreateResolver = class PostCreateResolver {
    async PostCreate(context, categoryId, input) {
        const response = new PostCreateResponse();
        const session = await typegoose_1.mongoose.startSession();
        await session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw errorHandling_2.errorGenForUnexist("User");
            }
            const category = await Category_model_1.CategoryModel.findById(categoryId);
            if (!category) {
                throw errorHandling_2.errorGenForUnexist("Category");
            }
            const post = new Post_model_1.Post(input);
            post.author = user;
            post.category = category;
            await errorHandling_1.validateClass(post);
            const postInstance = modelFunction_1.getMongoInstance(Post_model_1.PostModel, post);
            await postInstance.save({ session });
            response.setData(postInstance.toObject());
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
    type_graphql_1.Mutation(() => PostCreateResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("categoryId", () => mongodb_1.ObjectId)),
    __param(2, type_graphql_1.Args(() => PostCreateArgs)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongodb_1.ObjectId,
        PostCreateArgs]),
    __metadata("design:returntype", Promise)
], PostCreateResolver.prototype, "PostCreate", null);
PostCreateResolver = __decorate([
    type_graphql_1.Resolver()
], PostCreateResolver);
exports.PostCreateResolver = PostCreateResolver;
//# sourceMappingURL=PostCreate.resolver.js.map