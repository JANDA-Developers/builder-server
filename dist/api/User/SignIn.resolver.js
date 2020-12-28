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
exports.SignInResolver = exports.SignInArgs = void 0;
const type_graphql_1 = require("type-graphql");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const User_model_1 = require("../../models/User/User.model");
const Error_type_1 = require("../../api/Error/shared/Error.type");
const SignInResponse = BaseResponse_type_1.GenerateResponse(User_model_1.User, "SignIn");
let SignInArgs = class SignInArgs {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], SignInArgs.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], SignInArgs.prototype, "password", void 0);
SignInArgs = __decorate([
    type_graphql_1.ArgsType()
], SignInArgs);
exports.SignInArgs = SignInArgs;
let SignInResolver = class SignInResolver {
    async SignIn(input, context) {
        const response = new SignInResponse();
        try {
            const { email, password } = input;
            const user = await User_model_1.UserModel.findOne({
                email,
            });
            if (!user || !user.comparePassword(password)) {
                throw new Error_type_1.UserError("Email 또는 Password를 확인해주세요", "INVALID_EMAIL_OR_PASSWORD");
            }
            context.req.session["seller"] = user._id.toHexString();
            context.req.session.save((err) => {
                if (err) {
                    console.log(err);
                }
            });
            response.setData(user);
        }
        catch (error) {
            response.setError(error);
        }
        return response;
    }
};
__decorate([
    type_graphql_1.Mutation(() => SignInResponse),
    __param(0, type_graphql_1.Args(() => SignInArgs)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignInArgs, Object]),
    __metadata("design:returntype", Promise)
], SignInResolver.prototype, "SignIn", null);
SignInResolver = __decorate([
    type_graphql_1.Resolver()
], SignInResolver);
exports.SignInResolver = SignInResolver;
//# sourceMappingURL=SignIn.resolver.js.map