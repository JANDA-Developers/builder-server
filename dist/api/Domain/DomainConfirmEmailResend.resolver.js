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
exports.DomainConfirmEmailResendResolver = exports.DomainConfirmEmailResendResendOrError = exports.DomainConfirmEmailResendOutput = void 0;
const aws_sdk_1 = require("aws-sdk");
const type_graphql_1 = require("type-graphql");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
let DomainConfirmEmailResendOutput = class DomainConfirmEmailResendOutput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainConfirmEmailResendOutput.prototype, "domainName", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], DomainConfirmEmailResendOutput.prototype, "emailAddress", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Boolean)
], DomainConfirmEmailResendOutput.prototype, "isAlreadyVerified", void 0);
DomainConfirmEmailResendOutput = __decorate([
    type_graphql_1.ObjectType()
], DomainConfirmEmailResendOutput);
exports.DomainConfirmEmailResendOutput = DomainConfirmEmailResendOutput;
const DomainConfirmEmailResendResponse = BaseResponse_type_1.GenerateResponse(DomainConfirmEmailResendOutput, "DomainConfirmEmailResend");
exports.DomainConfirmEmailResendResendOrError = async (domainName) => {
    const invokeResult = await new aws_sdk_1.Lambda({ region: "us-east-1" })
        .invoke({
        FunctionName: "arn:aws:lambda:us-east-1:068549478648:function:domain-confirm-email-resend",
        Payload: JSON.stringify({ domainName }),
    })
        .promise();
    return typeof invokeResult.Payload === "string"
        ? JSON.parse(invokeResult.Payload)
        : undefined;
};
let DomainConfirmEmailResendResolver = class DomainConfirmEmailResendResolver {
    async DomainConfirmEmailResend(domainName) {
        const response = new DomainConfirmEmailResendResponse();
        try {
            const result = await exports.DomainConfirmEmailResendResendOrError(domainName);
            response.setData(result || null);
        }
        catch (error) {
            console.log(error);
            response.setError(error);
        }
        return response;
    }
};
__decorate([
    type_graphql_1.Mutation(() => DomainConfirmEmailResendResponse),
    __param(0, type_graphql_1.Arg("domainName", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DomainConfirmEmailResendResolver.prototype, "DomainConfirmEmailResend", null);
DomainConfirmEmailResendResolver = __decorate([
    type_graphql_1.Resolver()
], DomainConfirmEmailResendResolver);
exports.DomainConfirmEmailResendResolver = DomainConfirmEmailResendResolver;
//# sourceMappingURL=DomainConfirmEmailResend.resolver.js.map