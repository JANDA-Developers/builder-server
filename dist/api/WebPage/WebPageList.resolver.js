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
exports.WebPageListResolver = exports.WebPageSortType = exports.WebPageFilterType = void 0;
const generateFilterType_1 = require("../../helpers/decorators/FilterInputGen/generateFilterType");
const generateSrotType_1 = require("../../helpers/decorators/FilterInputGen/generateSrotType");
const errorHandling_1 = require("../../helpers/errorHandling");
const PaginationWithOffset_type_1 = require("../../helpers/PaginationWithOffset.type");
const WebPage_model_1 = require("../../models/WebPage/WebPage.model");
const type_graphql_1 = require("type-graphql");
const User_model_1 = require("../../models/User/User.model");
const const_1 = require("../../types/const");
exports.WebPageFilterType = generateFilterType_1.generateFilterType(WebPage_model_1.WebPage);
exports.WebPageSortType = generateSrotType_1.generateSortType(WebPage_model_1.WebPage);
const WebPageOffsetPaginatedData = PaginationWithOffset_type_1.OffsetPaginatedData(WebPage_model_1.WebPage);
let WebPageListResolver = class WebPageListResolver {
    async WebPageList(info, context, { pageIndex, pageItemCount }, filter = {}, sort) {
        const user = context.user;
        if (!user) {
            throw errorHandling_1.errorGenForUnexist("User");
        }
        if (user.role !== User_model_1.UserRole.ADMIN) {
            filter.owner_eq = user._id;
        }
        const pagingResult = new WebPageOffsetPaginatedData();
        await pagingResult.setData(WebPage_model_1.WebPageModel, {
            pageItemCount,
            pageIndex,
            filter,
            sort,
            query: {},
        }, ["author", "category"]);
        return pagingResult;
    }
};
__decorate([
    type_graphql_1.Authorized(const_1.ALLOW_ALL),
    type_graphql_1.Query(() => WebPageOffsetPaginatedData),
    __param(0, type_graphql_1.Info()),
    __param(1, type_graphql_1.Ctx()),
    __param(2, type_graphql_1.Arg("pagingInput", () => PaginationWithOffset_type_1.OffsetPagingInput)),
    __param(3, type_graphql_1.Arg("filter", exports.WebPageFilterType, { nullable: true })),
    __param(4, type_graphql_1.Arg("sort", exports.WebPageSortType, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, PaginationWithOffset_type_1.OffsetPagingInput, Object, Array]),
    __metadata("design:returntype", Promise)
], WebPageListResolver.prototype, "WebPageList", null);
WebPageListResolver = __decorate([
    type_graphql_1.Resolver()
], WebPageListResolver);
exports.WebPageListResolver = WebPageListResolver;
//# sourceMappingURL=WebPageList.resolver.js.map