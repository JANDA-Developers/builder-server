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
exports.DomainRegistrationType = exports.ExtraType = exports.ContactType = void 0;
const type_graphql_1 = require("type-graphql");
const CountryCode_enum_1 = require("./CountryCode.enum");
let ContactType = class ContactType {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "AddressLine1", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "AddressLine2", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "City", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "ContactType", void 0);
__decorate([
    type_graphql_1.Field(() => CountryCode_enum_1.CountryCode, { nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "CountryCode", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "Email", void 0);
__decorate([
    type_graphql_1.Field(() => [ExtraType], { nullable: true }),
    __metadata("design:type", Array)
], ContactType.prototype, "ExtraParams", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "Fax", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "FirstName", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "LastName", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "OrganizationName", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "PhoneNumber", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "State", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "ZipCode", void 0);
ContactType = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType("ContactTypeInput")
], ContactType);
exports.ContactType = ContactType;
let ExtraType = class ExtraType {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ExtraType.prototype, "Name", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ExtraType.prototype, "Value", void 0);
ExtraType = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType("ExtraTypeInput")
], ExtraType);
exports.ExtraType = ExtraType;
let DomainRegistrationType = class DomainRegistrationType {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainRegistrationType.prototype, "DomainName", void 0);
__decorate([
    type_graphql_1.Field(() => ContactType),
    __metadata("design:type", ContactType)
], DomainRegistrationType.prototype, "AdminContact", void 0);
__decorate([
    type_graphql_1.Field(() => ContactType),
    __metadata("design:type", ContactType)
], DomainRegistrationType.prototype, "RegistrantContact", void 0);
__decorate([
    type_graphql_1.Field(() => ContactType),
    __metadata("design:type", ContactType)
], DomainRegistrationType.prototype, "TechContact", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { defaultValue: true }),
    __metadata("design:type", Boolean)
], DomainRegistrationType.prototype, "AutoRenew", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { defaultValue: 1 }),
    __metadata("design:type", Number)
], DomainRegistrationType.prototype, "DurationInYears", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], DomainRegistrationType.prototype, "IdnLangCode", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { defaultValue: true }),
    __metadata("design:type", Boolean)
], DomainRegistrationType.prototype, "PrivacyProtectAdminContact", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { defaultValue: true }),
    __metadata("design:type", Boolean)
], DomainRegistrationType.prototype, "PrivacyProtectRegistrantContact", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { defaultValue: true }),
    __metadata("design:type", Boolean)
], DomainRegistrationType.prototype, "PrivacyProtectTechContact", void 0);
DomainRegistrationType = __decorate([
    type_graphql_1.ObjectType(),
    type_graphql_1.InputType("DomainRegistrationTypeInput")
], DomainRegistrationType);
exports.DomainRegistrationType = DomainRegistrationType;
//# sourceMappingURL=DomainRetistration.type.js.map