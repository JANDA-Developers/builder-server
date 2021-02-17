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
exports.DomainDetailsResolver = exports.DomainDetailsInvoke = exports.Nameserver = exports.DomainDetailsOutput = void 0;
const aws_sdk_1 = require("aws-sdk");
const type_graphql_1 = require("type-graphql");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const Error_type_1 = require("../Error/shared/Error.type");
const ContactDetail_type_1 = require("./shared/ContactDetail.type");
let DomainDetailsOutput = class DomainDetailsOutput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainDetailsOutput.prototype, "DomainName", void 0);
__decorate([
    type_graphql_1.Field(() => [Nameserver]),
    __metadata("design:type", Array)
], DomainDetailsOutput.prototype, "Nameservers", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", Boolean)
], DomainDetailsOutput.prototype, "AutoRenew", void 0);
__decorate([
    type_graphql_1.Field(() => ContactDetail_type_1.ContactInfo),
    __metadata("design:type", ContactDetail_type_1.ContactInfo)
], DomainDetailsOutput.prototype, "AdminContact", void 0);
__decorate([
    type_graphql_1.Field(() => ContactDetail_type_1.ContactInfo),
    __metadata("design:type", ContactDetail_type_1.ContactInfo)
], DomainDetailsOutput.prototype, "RegistrantContact", void 0);
__decorate([
    type_graphql_1.Field(() => ContactDetail_type_1.ContactInfo),
    __metadata("design:type", ContactDetail_type_1.ContactInfo)
], DomainDetailsOutput.prototype, "TechContact", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], DomainDetailsOutput.prototype, "AdminPrivacy", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], DomainDetailsOutput.prototype, "RegistrantPrivacy", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], DomainDetailsOutput.prototype, "TechPrivacy", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainDetailsOutput.prototype, "RegistrarName", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainDetailsOutput.prototype, "WhoIsServer", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainDetailsOutput.prototype, "RegistrarUrl", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainDetailsOutput.prototype, "AbuseContactEmail", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainDetailsOutput.prototype, "AbuseContactPhone", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainDetailsOutput.prototype, "CreationDate", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainDetailsOutput.prototype, "UpdatedDate", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainDetailsOutput.prototype, "ExpirationDate", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], DomainDetailsOutput.prototype, "StatusList", void 0);
DomainDetailsOutput = __decorate([
    type_graphql_1.ObjectType()
], DomainDetailsOutput);
exports.DomainDetailsOutput = DomainDetailsOutput;
let Nameserver = class Nameserver {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], Nameserver.prototype, "Name", void 0);
__decorate([
    type_graphql_1.Field(() => [String]),
    __metadata("design:type", Array)
], Nameserver.prototype, "GlueIps", void 0);
Nameserver = __decorate([
    type_graphql_1.ObjectType()
], Nameserver);
exports.Nameserver = Nameserver;
const DomainDetailsResponse = BaseResponse_type_1.GenerateResponse(DomainDetailsOutput, "DomainDetails");
exports.DomainDetailsInvoke = async (domainName) => {
    const response = await new aws_sdk_1.Lambda({ region: "us-east-1" })
        .invoke({
        FunctionName: "arn:aws:lambda:us-east-1:068549478648:function:domain-details",
        Payload: JSON.stringify({ domainName }),
    })
        .promise();
    return JSON.parse(response.Payload);
};
let DomainDetailsResolver = class DomainDetailsResolver {
    async DomainDetails(context, domainName) {
        const response = new DomainDetailsResponse();
        try {
            const result = await exports.DomainDetailsInvoke(domainName);
            console.log(result);
            if (!result.ok) {
                throw result.error;
            }
            response.setData(result.data);
        }
        catch (error) {
            response.ok = false;
            response.errors.push(new Error_type_1.UserError(error.message, error.code));
        }
        return response;
    }
};
__decorate([
    type_graphql_1.Query(() => DomainDetailsResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("domainName", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DomainDetailsResolver.prototype, "DomainDetails", null);
DomainDetailsResolver = __decorate([
    type_graphql_1.Resolver()
], DomainDetailsResolver);
exports.DomainDetailsResolver = DomainDetailsResolver;
//# sourceMappingURL=DomainDetails.resolver.js.map