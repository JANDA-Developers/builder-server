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
exports.SignUpResolver = exports.SignUpInput = void 0;
const type_graphql_1 = require("type-graphql");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const User_model_1 = require("../../models/User/User.model");
const typegoose_1 = require("@typegoose/typegoose");
const errorHandling_1 = require("../../helpers/errorHandling");
const Error_type_1 = require("../../api/Error/shared/Error.type");
const SignUpResponse = BaseResponse_type_1.GenerateResponse(User_model_1.User, "SignUp");
let SignUpInput = class SignUpInput {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], SignUpInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], SignUpInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], SignUpInput.prototype, "phoneNumber", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], SignUpInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], SignUpInput.prototype, "company", void 0);
SignUpInput = __decorate([
    type_graphql_1.InputType()
], SignUpInput);
exports.SignUpInput = SignUpInput;
let SignUpResolver = class SignUpResolver {
    async SignUp(input) {
        const response = new SignUpResponse();
        const session = await typegoose_1.mongoose.startSession();
        session.startTransaction();
        try {
            const user = new User_model_1.UserModel(input);
            user.role = User_model_1.UserRole.UNCONFIRMED;
            user.hashPassword();
            await errorHandling_1.validateClass(user);
            const isDuplidated = await User_model_1.UserModel.findOne({
                email: input.email,
            }, { _id: 1 });
            if (isDuplidated) {
                throw new Error_type_1.UserError("Already existing user infomation", "ALREADY_SIGNED_UP");
            }
            await user.save({ session });
            response.setData(user);
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
    type_graphql_1.Mutation(() => SignUpResponse),
    __param(0, type_graphql_1.Arg("input", () => SignUpInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignUpInput]),
    __metadata("design:returntype", Promise)
], SignUpResolver.prototype, "SignUp", null);
SignUpResolver = __decorate([
    type_graphql_1.Resolver()
], SignUpResolver);
exports.SignUpResolver = SignUpResolver;
//# sourceMappingURL=SignUp.resolver.js.map