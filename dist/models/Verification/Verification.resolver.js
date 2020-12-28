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
exports.VerificationResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Verification_type_1 = require("./Verification.type");
let VerificationResolver = class VerificationResolver {
    isExpire(root) {
        return root.isExpire();
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => Boolean),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Verification_type_1.Verification]),
    __metadata("design:returntype", Boolean)
], VerificationResolver.prototype, "isExpire", null);
VerificationResolver = __decorate([
    type_graphql_1.Resolver(() => Verification_type_1.Verification)
], VerificationResolver);
exports.VerificationResolver = VerificationResolver;
//# sourceMappingURL=Verification.resolver.js.map