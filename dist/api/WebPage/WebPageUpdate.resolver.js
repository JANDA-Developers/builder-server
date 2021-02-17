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
exports.WebPageUpdateResolver = exports.WebPageUpdateInput = void 0;
const type_graphql_1 = require("type-graphql");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const WebPage_model_1 = require("../../models/WebPage/WebPage.model");
const typegoose_1 = require("@typegoose/typegoose");
const errorHandling_1 = require("../../helpers/errorHandling");
const mongodb_1 = require("mongodb");
const graphql_type_json_1 = require("graphql-type-json");
const const_1 = require("../../types/const");
const WebPageUpdateResponse = BaseResponse_type_1.GenerateResponse(WebPage_model_1.WebPage, "WebPageUpdate");
let WebPageUpdateInput = class WebPageUpdateInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], WebPageUpdateInput.prototype, "domain", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], WebPageUpdateInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], WebPageUpdateInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], WebPageUpdateInput.prototype, "keyWards", void 0);
__decorate([
    type_graphql_1.Field(() => WebPage_model_1.WebPageType, { nullable: true }),
    __metadata("design:type", String)
], WebPageUpdateInput.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], WebPageUpdateInput.prototype, "templateKey", void 0);
__decorate([
    type_graphql_1.Field(() => [WebPage_model_1.Langs], { nullable: true }),
    __metadata("design:type", Array)
], WebPageUpdateInput.prototype, "supportLanguage", void 0);
__decorate([
    type_graphql_1.Field(() => graphql_type_json_1.GraphQLJSONObject, { nullable: true }),
    __metadata("design:type", Object)
], WebPageUpdateInput.prototype, "value", void 0);
WebPageUpdateInput = __decorate([
    type_graphql_1.InputType()
], WebPageUpdateInput);
exports.WebPageUpdateInput = WebPageUpdateInput;
let WebPageUpdateResolver = class WebPageUpdateResolver {
    async WebPageUpdate(context, WebPageId, input) {
        const response = new WebPageUpdateResponse();
        const session = await typegoose_1.mongoose.startSession();
        session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw errorHandling_1.errorGenForUnexist("User");
            }
            const WebPage = await WebPage_model_1.WebPageModel.findById(WebPageId);
            if (!WebPage) {
                throw errorHandling_1.errorGenForUnexist("WebPage");
            }
            for (const field in input) {
                if (Object.prototype.hasOwnProperty.call(input, field)) {
                    WebPage[field] = input[field];
                }
            }
            await WebPage.save({ session });
            response.setData(WebPage);
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
    type_graphql_1.Authorized(const_1.ALLOW_ALL),
    type_graphql_1.Mutation(() => WebPageUpdateResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id", () => mongodb_1.ObjectId)),
    __param(2, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongodb_1.ObjectId,
        WebPageUpdateInput]),
    __metadata("design:returntype", Promise)
], WebPageUpdateResolver.prototype, "WebPageUpdate", null);
WebPageUpdateResolver = __decorate([
    type_graphql_1.Resolver()
], WebPageUpdateResolver);
exports.WebPageUpdateResolver = WebPageUpdateResolver;
//# sourceMappingURL=WebPageUpdate.resolver.js.map