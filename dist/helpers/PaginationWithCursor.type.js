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
exports.CursorConnection = exports.CursorEdge = exports.CursorPageInfo = void 0;
const type_graphql_1 = require("type-graphql");
let CursorPageInfo = class CursorPageInfo {
};
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], CursorPageInfo.prototype, "hasNextPage", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], CursorPageInfo.prototype, "endCursor", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], CursorPageInfo.prototype, "startCursor", void 0);
CursorPageInfo = __decorate([
    type_graphql_1.ObjectType()
], CursorPageInfo);
exports.CursorPageInfo = CursorPageInfo;
exports.CursorEdge = (itemClass) => {
    let EdgeClass = class EdgeClass {
    };
    __decorate([
        type_graphql_1.Field(() => String),
        __metadata("design:type", String)
    ], EdgeClass.prototype, "cursor", void 0);
    __decorate([
        type_graphql_1.Field(() => itemClass),
        __metadata("design:type", Object)
    ], EdgeClass.prototype, "node", void 0);
    EdgeClass = __decorate([
        type_graphql_1.ObjectType(`${itemClass.name}Edge`)
    ], EdgeClass);
    return EdgeClass;
};
exports.CursorConnection = (itemClass) => {
    let ConnectionClass = class ConnectionClass {
    };
    __decorate([
        type_graphql_1.Field(() => type_graphql_1.Int),
        __metadata("design:type", Number)
    ], ConnectionClass.prototype, "totalCount", void 0);
    __decorate([
        type_graphql_1.Field(() => [exports.CursorEdge(itemClass)]),
        __metadata("design:type", Array)
    ], ConnectionClass.prototype, "edges", void 0);
    __decorate([
        type_graphql_1.Field(() => CursorPageInfo),
        __metadata("design:type", CursorPageInfo)
    ], ConnectionClass.prototype, "pageInfo", void 0);
    ConnectionClass = __decorate([
        type_graphql_1.ObjectType(`${itemClass.name}Connection`)
    ], ConnectionClass);
    return ConnectionClass;
};
//# sourceMappingURL=PaginationWithCursor.type.js.map