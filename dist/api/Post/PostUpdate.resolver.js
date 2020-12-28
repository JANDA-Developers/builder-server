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
exports.PostUpdateResolver = exports.PostUpdateInput = void 0;
const type_graphql_1 = require("type-graphql");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const Post_model_1 = require("../../models/Post/Post.model");
const typegoose_1 = require("@typegoose/typegoose");
const errorHandling_1 = require("../../helpers/errorHandling");
const mongodb_1 = require("mongodb");
const User_model_1 = require("../../models/User/User.model");
const Category_model_1 = require("../../models/Category/Category.model");
const PostUpdateResponse = BaseResponse_type_1.GenerateResponse(Post_model_1.Post, "PostUpdate");
let PostUpdateInput = class PostUpdateInput {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], PostUpdateInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], PostUpdateInput.prototype, "body", void 0);
PostUpdateInput = __decorate([
    type_graphql_1.InputType()
], PostUpdateInput);
exports.PostUpdateInput = PostUpdateInput;
let PostUpdateResolver = class PostUpdateResolver {
    async PostUpdate(context, postId, input, categoryId) {
        const response = new PostUpdateResponse();
        const session = await typegoose_1.mongoose.startSession();
        session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw errorHandling_1.errorGenForUnexist("User");
            }
            const post = await Post_model_1.PostModel.findById(postId);
            if (!post) {
                throw errorHandling_1.errorGenForUnexist("Post");
            }
            let cat = null;
            if (cat) {
                const cat = await Category_model_1.CategoryModel.findById(categoryId);
                if (!cat) {
                    throw errorHandling_1.errorGenForUnexist("Category");
                }
                post.category = cat;
            }
            for (const field in input) {
                if (Object.prototype.hasOwnProperty.call(input, field)) {
                    post[field] = input[field];
                }
            }
            await post.save({ session });
            response.setData(post);
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
    type_graphql_1.Mutation(() => PostUpdateResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id", () => mongodb_1.ObjectId)),
    __param(2, type_graphql_1.Arg("input", () => PostUpdateInput)),
    __param(3, type_graphql_1.Arg("categoryId", () => mongodb_1.ObjectId, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongodb_1.ObjectId,
        PostUpdateInput,
        mongodb_1.ObjectId]),
    __metadata("design:returntype", Promise)
], PostUpdateResolver.prototype, "PostUpdate", null);
PostUpdateResolver = __decorate([
    type_graphql_1.Resolver()
], PostUpdateResolver);
exports.PostUpdateResolver = PostUpdateResolver;
//# sourceMappingURL=PostUpdate.resolver.js.map