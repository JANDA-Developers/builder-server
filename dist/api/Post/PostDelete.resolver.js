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
exports.PostDeleteResolver = void 0;
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const Post_model_1 = require("../../models/Post/Post.model");
const typegoose_1 = require("@typegoose/typegoose");
const User_model_1 = require("../../models/User/User.model");
const errorHandling_1 = require("../../helpers/errorHandling");
const PostDeleteResponse = BaseResponse_type_1.GenerateResponse(Post_model_1.Post, "PostDelete");
let PostDeleteResolver = class PostDeleteResolver {
    async PostDelete(context, postId) {
        const response = new PostDeleteResponse();
        const session = await typegoose_1.mongoose.startSession();
        session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw errorHandling_1.errorGenForUnexist("User");
            }
            const post = await Post_model_1.PostModel.findOne({
                _id: postId,
            });
            if (!post) {
                throw errorHandling_1.errorGenForUnexist("Post");
            }
            await post.deleteOne();
            // Your Code Here~!
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
    type_graphql_1.Mutation(() => PostDeleteResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("postId", () => mongodb_1.ObjectId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongodb_1.ObjectId]),
    __metadata("design:returntype", Promise)
], PostDeleteResolver.prototype, "PostDelete", null);
PostDeleteResolver = __decorate([
    type_graphql_1.Resolver()
], PostDeleteResolver);
exports.PostDeleteResolver = PostDeleteResolver;
//# sourceMappingURL=PostDelete.resolver.js.map