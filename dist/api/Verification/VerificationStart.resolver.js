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
exports.VerificationProcessResolver = exports.VerificationStartArgs = exports.VerificationProcessResponse = void 0;
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const Verification_type_1 = require("../../models/Verification/Verification.type");
const typegoose_1 = require("@typegoose/typegoose");
const Verification_function_1 = require("../../models/Verification/Verification.function");
exports.VerificationProcessResponse = BaseResponse_type_1.GenerateResponse(Verification_type_1.Verification, "VerificationProcess");
let VerificationStartArgs = class VerificationStartArgs {
};
__decorate([
    type_graphql_1.Field(() => Verification_type_1.VerificationTarget),
    __metadata("design:type", Number)
], VerificationStartArgs.prototype, "target", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], VerificationStartArgs.prototype, "payload", void 0);
__decorate([
    type_graphql_1.Field(() => Verification_type_1.VerificationEvent),
    __metadata("design:type", Number)
], VerificationStartArgs.prototype, "event", void 0);
__decorate([
    type_graphql_1.Field(() => mongodb_1.ObjectId, { nullable: true }),
    __metadata("design:type", mongodb_1.ObjectId)
], VerificationStartArgs.prototype, "storeGroupId", void 0);
VerificationStartArgs = __decorate([
    type_graphql_1.ArgsType()
], VerificationStartArgs);
exports.VerificationStartArgs = VerificationStartArgs;
let VerificationProcessResolver = class VerificationProcessResolver {
    async VerificationStart(input) {
        const response = new exports.VerificationProcessResponse();
        const session = await typegoose_1.mongoose.startSession();
        session.startTransaction();
        try {
            const verification = await Verification_function_1.verificationCreate(input);
            await verification.save({ session });
            if (verification.target === Verification_type_1.VerificationTarget.PHONE) {
                await Verification_function_1.sendSmsVerificationCode(verification);
            }
            else if (verification.target === Verification_type_1.VerificationTarget.EMAIL) {
                // TODO: Email 전송 로직 ㄱㄱ
            }
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
    type_graphql_1.Mutation(() => exports.VerificationProcessResponse),
    __param(0, type_graphql_1.Args(() => VerificationStartArgs)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VerificationStartArgs]),
    __metadata("design:returntype", Promise)
], VerificationProcessResolver.prototype, "VerificationStart", null);
VerificationProcessResolver = __decorate([
    type_graphql_1.Resolver()
], VerificationProcessResolver);
exports.VerificationProcessResolver = VerificationProcessResolver;
//# sourceMappingURL=VerificationStart.resolver.js.map