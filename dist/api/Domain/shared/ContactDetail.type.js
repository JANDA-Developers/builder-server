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
exports.ExtraParam = exports.ContactInfo = void 0;
const type_graphql_1 = require("type-graphql");
let ContactInfo = class ContactInfo {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ContactInfo.prototype, "FirstName", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ContactInfo.prototype, "LastName", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ContactInfo.prototype, "ContactType", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ContactInfo.prototype, "OrganizationName", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ContactInfo.prototype, "AddressLine1", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactInfo.prototype, "AddressLine2", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ContactInfo.prototype, "City", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactInfo.prototype, "State", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ContactInfo.prototype, "CountryCode", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ContactInfo.prototype, "ZipCode", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ContactInfo.prototype, "PhoneNumber", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ContactInfo.prototype, "Email", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactInfo.prototype, "Fax", void 0);
__decorate([
    type_graphql_1.Field(() => [ExtraParam], { nullable: true }),
    __metadata("design:type", Array)
], ContactInfo.prototype, "ExtraParams", void 0);
ContactInfo = __decorate([
    type_graphql_1.InputType("ContactDetailInput"),
    type_graphql_1.ObjectType()
], ContactInfo);
exports.ContactInfo = ContactInfo;
let ExtraParam = class ExtraParam {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ExtraParam.prototype, "Name", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ExtraParam.prototype, "Value", void 0);
ExtraParam = __decorate([
    type_graphql_1.InputType("ExtraParamInput"),
    type_graphql_1.ObjectType()
], ExtraParam);
exports.ExtraParam = ExtraParam;
//# sourceMappingURL=ContactDetail.type.js.map