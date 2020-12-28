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
exports.CategoryModel = exports.Category = exports.SuperClass = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const CollectionData_type_1 = require("../../helpers/CollectionData.type");
const sortDecorator_1 = require("../../helpers/decorators/sortDecorator");
const FilterDecorators_1 = require("../../helpers/decorators/FilterInputGen/FilterDecorators");
const mongodb_1 = require("mongodb");
var SuperClass;
(function (SuperClass) {
    SuperClass[SuperClass["BOOKING"] = 0] = "BOOKING";
    SuperClass[SuperClass["TEMPLATEA"] = 1] = "TEMPLATEA";
    SuperClass[SuperClass["TIMESPACE"] = 2] = "TIMESPACE";
})(SuperClass = exports.SuperClass || (exports.SuperClass = {}));
let Category = class Category extends CollectionData_type_1.CollectionDataInterface {
};
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Category.prototype, "label", void 0);
__decorate([
    type_graphql_1.Field(() => SuperClass),
    typegoose_1.prop({ default: SuperClass.BOOKING }),
    __metadata("design:type", Number)
], Category.prototype, "superClass", void 0);
Category = __decorate([
    type_graphql_1.ObjectType({
        implements: CollectionData_type_1.CollectionDataInterface,
    }),
    typegoose_1.modelOptions({
        schemaOptions: {
            timestamps: true,
            collection: "Category",
        },
        options: {
            allowMixed: 0,
        },
    })
], Category);
exports.Category = Category;
FilterDecorators_1.ValueFilter(["eq", "in", "not_in"], () => mongodb_1.ObjectId)(Category.prototype, "_id");
sortDecorator_1.Sorting()(Category.prototype, "createdAt");
sortDecorator_1.Sorting()(Category.prototype, "updatedAt");
type_graphql_1.registerEnumType(SuperClass, {
    name: "SuperClass",
    description: "슈퍼 분류!",
});
exports.CategoryModel = typegoose_1.getModelForClass(Category);
//# sourceMappingURL=Category.model.js.map