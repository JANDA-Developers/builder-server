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
exports.WebPageCreateResolver = exports.WebPageCreateInput = void 0;
const WebPage_model_1 = require("../../models/WebPage/WebPage.model");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const errorHandling_1 = require("../../helpers/errorHandling");
const errorHandling_2 = require("../../helpers/errorHandling");
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const modelFunction_1 = require("../../utils/modelFunction");
const graphql_type_json_1 = require("graphql-type-json");
const const_1 = require("../../types/const");
const Error_type_1 = require("../Error/shared/Error.type");
const WebPageCreateResponse = BaseResponse_type_1.GenerateResponse(WebPage_model_1.WebPage, "WebPageCreate");
let WebPageCreateInput = class WebPageCreateInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], WebPageCreateInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], WebPageCreateInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], WebPageCreateInput.prototype, "keyWards", void 0);
__decorate([
    type_graphql_1.Field(() => WebPage_model_1.WebPageType),
    __metadata("design:type", String)
], WebPageCreateInput.prototype, "type", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], WebPageCreateInput.prototype, "templateKey", void 0);
__decorate([
    type_graphql_1.Field(() => [WebPage_model_1.Langs], { defaultValue: WebPage_model_1.Langs.KR }),
    __metadata("design:type", Array)
], WebPageCreateInput.prototype, "supportLanguage", void 0);
__decorate([
    type_graphql_1.Field(() => graphql_type_json_1.GraphQLJSONObject),
    __metadata("design:type", Object)
], WebPageCreateInput.prototype, "value", void 0);
WebPageCreateInput = __decorate([
    type_graphql_1.InputType()
], WebPageCreateInput);
exports.WebPageCreateInput = WebPageCreateInput;
let WebPageCreateResolver = class WebPageCreateResolver {
    async WebPageCreate(context, input) {
        const response = new WebPageCreateResponse();
        const session = await typegoose_1.mongoose.startSession();
        await session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw errorHandling_2.errorGenForUnexist("User");
            }
            // 갯수제한 초과 검사
            const count = user.webpages.length;
            if (count === user.pageLimit) {
                throw new Error_type_1.UserError(`해당 유저는 페이지를 이미 ${count}개 가지고 있습니다.`, "LIMIT_BLOCKED");
            }
            const webpage = new WebPage_model_1.WebPage(input);
            webpage.owner = user;
            await errorHandling_1.validateClass(webpage);
            const webpageInstance = modelFunction_1.getMongoInstance(WebPage_model_1.WebPageModel, webpage);
            await webpageInstance.save({ session });
            response.setData(webpageInstance.toObject());
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
    type_graphql_1.Mutation(() => WebPageCreateResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, WebPageCreateInput]),
    __metadata("design:returntype", Promise)
], WebPageCreateResolver.prototype, "WebPageCreate", null);
WebPageCreateResolver = __decorate([
    type_graphql_1.Resolver()
], WebPageCreateResolver);
exports.WebPageCreateResolver = WebPageCreateResolver;
//# sourceMappingURL=WebPageCreate.resolver.js.map