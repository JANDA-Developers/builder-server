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
exports.CollectionDataInterface = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const mongodb_1 = require("mongodb");
let CollectionDataInterface = class CollectionDataInterface extends defaultClasses_1.Base {
    constructor(args) {
        super();
        if (args) {
            for (const key in args) {
                const element = args[key];
                console.log(key);
                console.log(args[key]);
                console.log(this[key]);
                this[key] = element;
            }
        }
    }
};
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], CollectionDataInterface.prototype, "createdAt", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], CollectionDataInterface.prototype, "updatedAt", void 0);
CollectionDataInterface = __decorate([
    type_graphql_1.InterfaceType({
        resolveType: (value) => value.constructor.name,
    }),
    __metadata("design:paramtypes", [Object])
], CollectionDataInterface);
exports.CollectionDataInterface = CollectionDataInterface;
type_graphql_1.Field(() => mongodb_1.ObjectId)(CollectionDataInterface.prototype, "_id");
type_graphql_1.Field(() => Date)(CollectionDataInterface.prototype, "createdAt");
type_graphql_1.Field(() => Date)(CollectionDataInterface.prototype, "updatedAt");
//# sourceMappingURL=CollectionData.type.js.map