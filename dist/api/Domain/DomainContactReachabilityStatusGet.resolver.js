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
exports.DomainContactReachabilityGetResolver = exports.DomainContactReachabilityGetResponse = void 0;
const type_graphql_1 = require("type-graphql");
const aws_sdk_1 = require("aws-sdk");
let DomainContactReachabilityGetResponse = class DomainContactReachabilityGetResponse {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainContactReachabilityGetResponse.prototype, "domainName", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], DomainContactReachabilityGetResponse.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], DomainContactReachabilityGetResponse.prototype, "error", void 0);
DomainContactReachabilityGetResponse = __decorate([
    type_graphql_1.ObjectType()
], DomainContactReachabilityGetResponse);
exports.DomainContactReachabilityGetResponse = DomainContactReachabilityGetResponse;
let DomainContactReachabilityGetResolver = class DomainContactReachabilityGetResolver {
    async DomainContactReachabilityGet(context, domainName) {
        const result = await new aws_sdk_1.Lambda({ region: "us-east-1" })
            .invoke({
            FunctionName: "arn:aws:lambda:us-east-1:068549478648:function:domain-contact-status",
            Payload: JSON.stringify({ domainName }),
        })
            .promise();
        console.log(result);
        if (result.Payload) {
            return Object.assign(new DomainContactReachabilityGetResponse(), JSON.parse(result.Payload));
        }
        return {
            domainName,
        };
    }
};
__decorate([
    type_graphql_1.Query(() => DomainContactReachabilityGetResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("domainName", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DomainContactReachabilityGetResolver.prototype, "DomainContactReachabilityGet", null);
DomainContactReachabilityGetResolver = __decorate([
    type_graphql_1.Resolver()
], DomainContactReachabilityGetResolver);
exports.DomainContactReachabilityGetResolver = DomainContactReachabilityGetResolver;
//# sourceMappingURL=DomainContactReachabilityStatusGet.resolver.js.map