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
exports.DomainContactUpdateResolver = exports.DomainContactUpdateOrError = exports.DomainContactUpdateInput = void 0;
const type_graphql_1 = require("type-graphql");
const ContactDetail_type_1 = require("./shared/ContactDetail.type");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const DomainOperationOutput_type_1 = require("./shared/DomainOperationOutput.type");
const Error_type_1 = require("../Error/shared/Error.type");
const aws_sdk_1 = require("aws-sdk");
const DomainContactUpdateResponse = BaseResponse_type_1.GenerateResponse(DomainOperationOutput_type_1.DomainOperationOutput, "DomainContactUpdate");
let DomainContactUpdateInput = class DomainContactUpdateInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainContactUpdateInput.prototype, "domainName", void 0);
__decorate([
    type_graphql_1.Field(() => ContactDetail_type_1.ContactInfo, { nullable: true }),
    __metadata("design:type", ContactDetail_type_1.ContactInfo)
], DomainContactUpdateInput.prototype, "adminContact", void 0);
__decorate([
    type_graphql_1.Field(() => ContactDetail_type_1.ContactInfo, { nullable: true }),
    __metadata("design:type", ContactDetail_type_1.ContactInfo)
], DomainContactUpdateInput.prototype, "registrantContact", void 0);
__decorate([
    type_graphql_1.Field(() => ContactDetail_type_1.ContactInfo, { nullable: true }),
    __metadata("design:type", ContactDetail_type_1.ContactInfo)
], DomainContactUpdateInput.prototype, "techContact", void 0);
DomainContactUpdateInput = __decorate([
    type_graphql_1.InputType()
], DomainContactUpdateInput);
exports.DomainContactUpdateInput = DomainContactUpdateInput;
exports.DomainContactUpdateOrError = async (input) => {
    const invokeResult = await new aws_sdk_1.Lambda({
        region: "us-east-1",
    })
        .invoke({
        FunctionName: "arn:aws:lambda:us-east-1:068549478648:function:domain-contact-update",
        Payload: JSON.stringify(input),
    })
        .promise();
    return invokeResult.Payload;
};
let DomainContactUpdateResolver = class DomainContactUpdateResolver {
    async DomainContactUpdate(context, input) {
        const response = new DomainContactUpdateResponse();
        try {
            const result = JSON.parse((await exports.DomainContactUpdateOrError(input)));
            console.log(result);
            if (!result.ok) {
                throw result.error;
            }
            response.setData(result.data);
        }
        catch (error) {
            response.setError(new Error_type_1.UserError(error.message, error.code));
        }
        return response;
    }
};
__decorate([
    type_graphql_1.Mutation(() => DomainContactUpdateResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("input", () => DomainContactUpdateInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, DomainContactUpdateInput]),
    __metadata("design:returntype", Promise)
], DomainContactUpdateResolver.prototype, "DomainContactUpdate", null);
DomainContactUpdateResolver = __decorate([
    type_graphql_1.Resolver()
], DomainContactUpdateResolver);
exports.DomainContactUpdateResolver = DomainContactUpdateResolver;
//# sourceMappingURL=DomainContactUpdate.resolver.js.map