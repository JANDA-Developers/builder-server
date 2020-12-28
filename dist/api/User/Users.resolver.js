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
exports.UsersResolver = exports.UserFindInput = void 0;
const type_graphql_1 = require("type-graphql");
const PaginationWithOffset_type_1 = require("../../helpers/PaginationWithOffset.type");
const User_model_1 = require("../../models/User/User.model");
const UserOffsetPaginatedData = PaginationWithOffset_type_1.OffsetPaginatedData(User_model_1.User);
let UserFindInput = class UserFindInput {
};
__decorate([
    type_graphql_1.Field(() => PaginationWithOffset_type_1.OffsetPagingInput),
    __metadata("design:type", PaginationWithOffset_type_1.OffsetPagingInput)
], UserFindInput.prototype, "pageInput", void 0);
UserFindInput = __decorate([
    type_graphql_1.ArgsType()
], UserFindInput);
exports.UserFindInput = UserFindInput;
let UsersResolver = class UsersResolver {
    async users({ pageInput: { pageItemCount, pageIndex } }) {
        const paginatedResult = new UserOffsetPaginatedData();
        await paginatedResult.setData(User_model_1.UserModel, {
            pageItemCount,
            pageIndex,
        });
        return paginatedResult;
    }
};
__decorate([
    type_graphql_1.Query(() => UserOffsetPaginatedData),
    type_graphql_1.Authorized(User_model_1.UserRole.ADMIN),
    __param(0, type_graphql_1.Args(() => UserFindInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserFindInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "users", null);
UsersResolver = __decorate([
    type_graphql_1.Resolver(() => User_model_1.User)
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=Users.resolver.js.map