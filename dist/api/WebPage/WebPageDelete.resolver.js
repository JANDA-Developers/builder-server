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
exports.WebPageDeleteResolver = void 0;
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const WebPage_model_1 = require("../../models/WebPage/WebPage.model");
const typegoose_1 = require("@typegoose/typegoose");
const errorHandling_1 = require("../../helpers/errorHandling");
const const_1 = require("../../types/const");
const WebPageDeleteResponse = BaseResponse_type_1.GenerateResponse(WebPage_model_1.WebPage, "WebPageDelete");
let WebPageDeleteResolver = class WebPageDeleteResolver {
    async WebPageDelete(context, WebPageId) {
        const response = new WebPageDeleteResponse();
        const session = await typegoose_1.mongoose.startSession();
        session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw errorHandling_1.errorGenForUnexist("User");
            }
            const WebPage = await WebPage_model_1.WebPageModel.findOne({
                _id: WebPageId,
            });
            if (!WebPage) {
                throw errorHandling_1.errorGenForUnexist("WebPage");
            }
            await WebPage.deleteOne();
            // Your Code Here~!
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
    type_graphql_1.Mutation(() => WebPageDeleteResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("WebPageId", () => mongodb_1.ObjectId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongodb_1.ObjectId]),
    __metadata("design:returntype", Promise)
], WebPageDeleteResolver.prototype, "WebPageDelete", null);
WebPageDeleteResolver = __decorate([
    type_graphql_1.Resolver()
], WebPageDeleteResolver);
exports.WebPageDeleteResolver = WebPageDeleteResolver;
//# sourceMappingURL=WebPageDelete.resolver.js.map