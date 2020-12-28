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
exports.IEdgeData = void 0;
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
let IEdgeData = class IEdgeData {
};
__decorate([
    type_graphql_1.Field(() => mongodb_1.ObjectId),
    __metadata("design:type", mongodb_1.ObjectId)
], IEdgeData.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], IEdgeData.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], IEdgeData.prototype, "expiresAt", void 0);
__decorate([
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], IEdgeData.prototype, "updatedAt", void 0);
IEdgeData = __decorate([
    type_graphql_1.InterfaceType({
        description: "Edge for Schemas",
        resolveType: (value) => value.constructor.name,
    })
], IEdgeData);
exports.IEdgeData = IEdgeData;
//# sourceMappingURL=IEdge.interface.js.map