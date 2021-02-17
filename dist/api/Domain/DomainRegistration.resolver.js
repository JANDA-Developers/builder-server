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
exports.DomainRegistrationResolver = exports.DomainRegistrationOrError = void 0;
const type_graphql_1 = require("type-graphql");
const aws_sdk_1 = require("aws-sdk");
const mongodb_1 = require("mongodb");
const DomainRetistration_type_1 = require("./shared/DomainRetistration.type");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const Error_type_1 = require("../Error/shared/Error.type");
const DomainOperationOutput_type_1 = require("./shared/DomainOperationOutput.type");
const recordSetFunctions_1 = require("../../utils/domain/recordSetFunctions");
const DomainRegistrationResponse = BaseResponse_type_1.GenerateResponse(DomainOperationOutput_type_1.DomainOperationOutput, "DomainRegistration");
exports.DomainRegistrationOrError = async (input) => {
    const invokeResult = await new aws_sdk_1.Lambda({
        region: "us-east-1",
    })
        .invoke({
        FunctionName: "arn:aws:lambda:us-east-1:068549478648:function:domain-registration",
        Payload: JSON.stringify(input),
    })
        .promise();
    return invokeResult.Payload;
};
let DomainRegistrationResolver = class DomainRegistrationResolver {
    async DomainRegistration(context, input) {
        const response = new DomainRegistrationResponse();
        try {
            // TODO: 렛츠고 ㅎㅎ
            const result = JSON.parse((await exports.DomainRegistrationOrError(input)));
            console.log(result);
            if (!result.ok) {
                throw result.error;
            }
            else {
                const callerReference = new mongodb_1.ObjectId();
                const hostedZoneCreateResult = await recordSetFunctions_1.HostedZoneCreate({
                    callerReference: callerReference.toHexString(),
                    domainName: input.DomainName,
                });
                console.log(hostedZoneCreateResult);
                // TODO: HostedZoneId User에게 저장!
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
    type_graphql_1.Mutation(() => DomainRegistrationResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("input", () => DomainRetistration_type_1.DomainRegistrationType)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, DomainRetistration_type_1.DomainRegistrationType]),
    __metadata("design:returntype", Promise)
], DomainRegistrationResolver.prototype, "DomainRegistration", null);
DomainRegistrationResolver = __decorate([
    type_graphql_1.Resolver()
], DomainRegistrationResolver);
exports.DomainRegistrationResolver = DomainRegistrationResolver;
//# sourceMappingURL=DomainRegistration.resolver.js.map