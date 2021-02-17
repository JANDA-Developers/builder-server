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
exports.userListResolver = exports.userSortType = exports.userFilterType = void 0;
const generateFilterType_1 = require("../../helpers/decorators/FilterInputGen/generateFilterType");
const generateSrotType_1 = require("../../helpers/decorators/FilterInputGen/generateSrotType");
const errorHandling_1 = require("../../helpers/errorHandling");
const PaginationWithOffset_type_1 = require("../../helpers/PaginationWithOffset.type");
const type_graphql_1 = require("type-graphql");
const User_model_1 = require("../../models/User/User.model");
exports.userFilterType = generateFilterType_1.generateFilterType(User_model_1.User);
exports.userSortType = generateSrotType_1.generateSortType(User_model_1.User);
const userOffsetPaginatedData = PaginationWithOffset_type_1.OffsetPaginatedData(User_model_1.User);
let userListResolver = class userListResolver {
    async UserList(context, { pageIndex, pageItemCount }, filter = {}, sort) {
        const user = context.user;
        if (!user) {
            throw errorHandling_1.errorGenForUnexist("User");
        }
        if (user.role !== User_model_1.UserRole.ADMIN) {
            filter.owner_eq = user._id;
        }
        const pagingResult = new userOffsetPaginatedData();
        await pagingResult.setData(User_model_1.UserModel, {
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
    type_graphql_1.Authorized(User_model_1.UserRole.ADMIN),
    type_graphql_1.Query(() => userOffsetPaginatedData),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("pagingInput", () => PaginationWithOffset_type_1.OffsetPagingInput)),
    __param(2, type_graphql_1.Arg("filter", exports.userFilterType, { nullable: true })),
    __param(3, type_graphql_1.Arg("sort", exports.userSortType, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PaginationWithOffset_type_1.OffsetPagingInput, Object, Array]),
    __metadata("design:returntype", Promise)
], userListResolver.prototype, "UserList", null);
userListResolver = __decorate([
    type_graphql_1.Resolver()
], userListResolver);
exports.userListResolver = userListResolver;
//# sourceMappingURL=UserList.resolver.js.map