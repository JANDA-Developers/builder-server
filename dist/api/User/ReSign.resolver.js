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
exports.ReSignResolver = exports.ReSignArgs = void 0;
const type_graphql_1 = require("type-graphql");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const User_model_1 = require("../../models/User/User.model");
let ReSigin = class ReSigin {
    constructor(message) {
        this.message = message;
    }
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ReSigin.prototype, "message", void 0);
ReSigin = __decorate([
    type_graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String])
], ReSigin);
const ReSignResponse = BaseResponse_type_1.GenerateResponse(ReSigin, "ReSign");
let ReSignArgs = class ReSignArgs {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], ReSignArgs.prototype, "email", void 0);
ReSignArgs = __decorate([
    type_graphql_1.ArgsType()
], ReSignArgs);
exports.ReSignArgs = ReSignArgs;
let ReSignResolver = class ReSignResolver {
    async ReSign(email) {
        const response = new ReSignResponse();
        try {
            const target = await User_model_1.UserModel.findOne({ email });
            if (!target) {
                throw Error(`대상 ${target}는 존재하지 않습니다.`);
            }
            else {
                target.deleteOne();
            }
            target.save();
            response.setData(null);
        }
        catch (error) {
            response.setError(error);
        }
        return response;
    }
};
__decorate([
    type_graphql_1.Authorized(User_model_1.UserRole.ADMIN),
    type_graphql_1.Mutation(() => ReSignResponse),
    __param(0, type_graphql_1.Arg("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReSignResolver.prototype, "ReSign", null);
ReSignResolver = __decorate([
    type_graphql_1.Resolver()
], ReSignResolver);
exports.ReSignResolver = ReSignResolver;
//# sourceMappingURL=ReSign.resolver.js.map