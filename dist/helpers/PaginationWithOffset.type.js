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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetPaginatedData = exports.OffsetPagingInput = exports.OffsetPagingInfo = void 0;
const type_graphql_1 = require("type-graphql");
const fileDecorationFunc_1 = require("../utils/fileDecorationFunc");
let OffsetPagingInfo = class OffsetPagingInfo {
    constructor(input) {
        const { page, currentItemCount, pageItemCount, totalDocumentCount, } = input;
        this.pageIndex = page;
        this.pageItemCount = pageItemCount;
        this.totalPageCount = Math.ceil(totalDocumentCount / pageItemCount);
        this.currentItemCount = currentItemCount;
    }
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { description: "선택한 페이지 번호" }),
    __metadata("design:type", Number)
], OffsetPagingInfo.prototype, "pageIndex", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { description: "페이지당 기준 데이터 수" }),
    __metadata("design:type", Number)
], OffsetPagingInfo.prototype, "pageItemCount", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { description: "현재 페이지에서 출력한 데이터 수" }),
    __metadata("design:type", Number)
], OffsetPagingInfo.prototype, "currentItemCount", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { description: "전체 페이지 수" }),
    __metadata("design:type", Number)
], OffsetPagingInfo.prototype, "totalPageCount", void 0);
OffsetPagingInfo = __decorate([
    type_graphql_1.ObjectType(),
    __metadata("design:paramtypes", [Object])
], OffsetPagingInfo);
exports.OffsetPagingInfo = OffsetPagingInfo;
let OffsetPagingInput = class OffsetPagingInput {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], OffsetPagingInput.prototype, "pageIndex", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], OffsetPagingInput.prototype, "pageItemCount", void 0);
OffsetPagingInput = __decorate([
    type_graphql_1.InputType()
], OffsetPagingInput);
exports.OffsetPagingInput = OffsetPagingInput;
exports.OffsetPaginatedData = (TItemClass) => {
    let OffsetPagenatedData = class OffsetPagenatedData {
        async setData(model, pageInfo, populations) {
            const { filter, pageIndex, pageItemCount, sort, query } = pageInfo;
            const filterQuery = fileDecorationFunc_1.toMongoQuery(filter);
            const [totalDocumentCount, items] = await Promise.all([
                model.find(filterQuery).find(query).countDocuments(),
                model
                    .find(filterQuery)
                    .find(query)
                    .sort(toMongoSort(sort))
                    .skip(pageIndex * pageItemCount)
                    .limit(pageItemCount)
                    .populate(populations)
                    .exec(),
            ]);
            this.items = items;
            this.pageInfo = new OffsetPagingInfo({
                page: pageIndex,
                currentItemCount: items.length,
                totalDocumentCount,
                pageItemCount: pageItemCount,
            });
        }
    };
    __decorate([
        type_graphql_1.Field(() => OffsetPagingInfo),
        __metadata("design:type", OffsetPagingInfo)
    ], OffsetPagenatedData.prototype, "pageInfo", void 0);
    __decorate([
        type_graphql_1.Field(() => [TItemClass]),
        __metadata("design:type", Array)
    ], OffsetPagenatedData.prototype, "items", void 0);
    OffsetPagenatedData = __decorate([
        type_graphql_1.ObjectType(`OffsetPagenated${TItemClass.name}Data`)
    ], OffsetPagenatedData);
    return OffsetPagenatedData;
};
const toMongoSort = (rawSort) => {
    if (!rawSort) {
        return undefined;
    }
    const temp = {};
    rawSort.forEach((r) => {
        const d = r.split("_");
        temp[d[0]] = d[1] === "asc" ? 1 : -1;
    });
    return temp;
};
//# sourceMappingURL=PaginationWithOffset.type.js.map