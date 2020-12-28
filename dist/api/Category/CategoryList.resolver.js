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
exports.CategoryListResolver = exports.CategorySortType = exports.CategoryFilterType = void 0;
const generateFilterType_1 = require("../../helpers/decorators/FilterInputGen/generateFilterType");
const generateSrotType_1 = require("../../helpers/decorators/FilterInputGen/generateSrotType");
const errorHandling_1 = require("../../helpers/errorHandling");
const PaginationWithOffset_type_1 = require("../../helpers/PaginationWithOffset.type");
const Category_model_1 = require("../../models/Category/Category.model");
const type_graphql_1 = require("type-graphql");
exports.CategoryFilterType = generateFilterType_1.generateFilterType(Category_model_1.Category);
exports.CategorySortType = generateSrotType_1.generateSortType(Category_model_1.Category);
const CategoryOffsetPaginatedData = PaginationWithOffset_type_1.OffsetPaginatedData(Category_model_1.Category);
let CategoryListResolver = class CategoryListResolver {
    async CategoryList(context, { pageIndex, pageItemCount }, filter, sort) {
        const user = context.user;
        if (!user) {
            throw errorHandling_1.errorGenForUnexist("User");
        }
        const pagingResult = new CategoryOffsetPaginatedData();
        await pagingResult.setData(Category_model_1.CategoryModel, {
            pageItemCount,
            pageIndex,
            query: {},
            filter,
            sort,
        });
        return pagingResult;
    }
};
__decorate([
    type_graphql_1.Query(() => CategoryOffsetPaginatedData),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("pagingInput", () => PaginationWithOffset_type_1.OffsetPagingInput)),
    __param(2, type_graphql_1.Arg("filter", exports.CategoryFilterType, { nullable: true })),
    __param(3, type_graphql_1.Arg("sort", exports.CategorySortType, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PaginationWithOffset_type_1.OffsetPagingInput, Object, Array]),
    __metadata("design:returntype", Promise)
], CategoryListResolver.prototype, "CategoryList", null);
CategoryListResolver = __decorate([
    type_graphql_1.Resolver()
], CategoryListResolver);
exports.CategoryListResolver = CategoryListResolver;
//# sourceMappingURL=CategoryList.resolver.js.map