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
exports.WebPageFindByKeyResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const WebPage_model_1 = require("../../models/WebPage/WebPage.model");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const isDomain_1 = require("../../utils/isDomain");
const WebPageFindByKeyResponse = BaseResponse_type_1.GenerateFindOneResponse(WebPage_model_1.WebPage, "WebPageFindByKey");
let WebPageFindByKeyResolver = class WebPageFindByKeyResolver {
    async WebPageFindByKey(key) {
        const response = new WebPageFindByKeyResponse();
        const session = await typegoose_1.mongoose.startSession();
        session.startTransaction();
        try {
            let webPage = null;
            if (isDomain_1.isDomain(key)) {
                webPage = await WebPage_model_1.WebPageModel.findOne({
                    domain: key,
                });
            }
            else {
                webPage = await WebPage_model_1.WebPageModel.findOne({
                    key,
                });
            }
            if (!webPage)
                throw Error(`Webpage is not found with key ${key}`);
            if (webPage !== null && webPage !== undefined) {
                response.setData(webPage);
                await session.commitTransaction();
            }
        }
        catch (e) {
            await session.abortTransaction();
            response.setError({
                code: "",
                details: [],
                message: JSON.stringify(e),
            });
        }
        finally {
            session.endSession();
        }
        return response;
    }
};
__decorate([
    type_graphql_1.Query(() => WebPageFindByKeyResponse, {
        description: "도메인을 넣으면 도메인 으로 검사",
    }),
    __param(0, type_graphql_1.Arg("key")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WebPageFindByKeyResolver.prototype, "WebPageFindByKey", null);
WebPageFindByKeyResolver = __decorate([
    type_graphql_1.Resolver()
], WebPageFindByKeyResolver);
exports.WebPageFindByKeyResolver = WebPageFindByKeyResolver;
//# sourceMappingURL=WebPageFindByKey.resolver.js.map