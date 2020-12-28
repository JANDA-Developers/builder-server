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
exports.VerificationComplete = exports.VerificationCompleteArgs = void 0;
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
const Verification_type_1 = require("../../models/Verification/Verification.type");
const typegoose_1 = require("@typegoose/typegoose");
const Verification_function_1 = require("../../models/Verification/Verification.function");
const VerificationStart_resolver_1 = require("../../api/Verification/VerificationStart.resolver");
let VerificationCompleteArgs = class VerificationCompleteArgs {
};
__decorate([
    type_graphql_1.Field(() => mongodb_1.ObjectId),
    __metadata("design:type", mongodb_1.ObjectId)
], VerificationCompleteArgs.prototype, "verificationId", void 0);
__decorate([
    type_graphql_1.Field(() => Verification_type_1.VerificationTarget),
    __metadata("design:type", Number)
], VerificationCompleteArgs.prototype, "target", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], VerificationCompleteArgs.prototype, "code", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], VerificationCompleteArgs.prototype, "payload", void 0);
VerificationCompleteArgs = __decorate([
    type_graphql_1.ArgsType()
], VerificationCompleteArgs);
exports.VerificationCompleteArgs = VerificationCompleteArgs;
let VerificationComplete = class VerificationComplete {
    async VerificationComplete(input) {
        const response = new VerificationStart_resolver_1.VerificationProcessResponse();
        const session = await typegoose_1.mongoose.startSession();
        session.startTransaction();
        try {
            const verification = await Verification_function_1.verificationFind(input.verificationId);
            verification.codeConfirm(input.code);
            await verification.save({ session });
            // TODO: Event 기반으로 인증 후 여러가지 액션이 나올 수 있음...
            // => ex) event:UserVerifyPhone 인 경우
            //        - 현재 로그인 되어있는 User를 Context에서 찾아서 verifiedPhone=true로 변경
            response.setData(verification);
            await session.commitTransaction();
        }
        catch (error) {
            response.setError(error);
            await session.abortTransaction();
        }
        finally {
            session.endSession();
        }
        return response;
    }
};
__decorate([
    type_graphql_1.Mutation(() => VerificationStart_resolver_1.VerificationProcessResponse),
    __param(0, type_graphql_1.Args(() => VerificationCompleteArgs)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VerificationCompleteArgs]),
    __metadata("design:returntype", Promise)
], VerificationComplete.prototype, "VerificationComplete", null);
VerificationComplete = __decorate([
    type_graphql_1.Resolver()
], VerificationComplete);
exports.VerificationComplete = VerificationComplete;
//# sourceMappingURL=VerificationComplete.resolver.js.map