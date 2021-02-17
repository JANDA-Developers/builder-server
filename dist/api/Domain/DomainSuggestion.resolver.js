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
exports.DomainSuggestionResolver = exports.getTLD = exports.DomainSuggestion = exports.DomainSuggestionInput = void 0;
const type_graphql_1 = require("type-graphql");
const aws_sdk_1 = require("aws-sdk");
const DomainPriceTable_1 = require("./shared/DomainPriceTable");
let DomainSuggestionInput = class DomainSuggestionInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainSuggestionInput.prototype, "domainName", void 0);
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], DomainSuggestionInput.prototype, "onlyAvailable", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int, { defaultValue: 50 }),
    __metadata("design:type", Number)
], DomainSuggestionInput.prototype, "suggestionCount", void 0);
DomainSuggestionInput = __decorate([
    type_graphql_1.InputType()
], DomainSuggestionInput);
exports.DomainSuggestionInput = DomainSuggestionInput;
let DomainSuggestion = class DomainSuggestion {
};
__decorate([
    type_graphql_1.Field(() => String, {
        nullable: true,
        description: "AVAILABLE 인 도메인만 등록 가능",
    }),
    __metadata("design:type", String)
], DomainSuggestion.prototype, "Availability", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainSuggestion.prototype, "DomainName", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], DomainSuggestion.prototype, "PriceRegistration", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], DomainSuggestion.prototype, "PriceChangeOwnership", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Object)
], DomainSuggestion.prototype, "PriceRestoration", void 0);
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Object)
], DomainSuggestion.prototype, "PriceTransfer", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], DomainSuggestion.prototype, "TransferTerm", void 0);
DomainSuggestion = __decorate([
    type_graphql_1.ObjectType()
], DomainSuggestion);
exports.DomainSuggestion = DomainSuggestion;
exports.getTLD = (domain) => {
    return domain.substring(domain.lastIndexOf(".") + 1);
};
let DomainSuggestionResolver = class DomainSuggestionResolver {
    async DomainSuggestion(input) {
        try {
            const lambda = new aws_sdk_1.Lambda({
                region: "us-east-1",
            });
            const result = await lambda
                .invoke({
                FunctionName: "domain-suggestion",
                Payload: JSON.stringify({
                    domainName: input.domainName,
                    onlyAvailable: input.onlyAvailable,
                    suggestionCount: input.suggestionCount,
                }),
            })
                .promise();
            if (result.$response.data != null) {
                const data = JSON.parse(result.$response.data.Payload).map(({ DomainName, Availability }) => {
                    const tld = exports.getTLD(DomainName);
                    const priceTableItem = DomainPriceTable_1.tldMap.get(tld);
                    const result = Object.assign(new DomainSuggestion(), {
                        DomainName,
                        Availability,
                        ...priceTableItem,
                    });
                    return result;
                });
                return data;
            }
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
        return undefined;
    }
};
__decorate([
    type_graphql_1.Query(() => [DomainSuggestion]),
    __param(0, type_graphql_1.Arg("input", () => DomainSuggestionInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DomainSuggestionInput]),
    __metadata("design:returntype", Promise)
], DomainSuggestionResolver.prototype, "DomainSuggestion", null);
DomainSuggestionResolver = __decorate([
    type_graphql_1.Resolver()
], DomainSuggestionResolver);
exports.DomainSuggestionResolver = DomainSuggestionResolver;
//# sourceMappingURL=DomainSuggestion.resolver.js.map