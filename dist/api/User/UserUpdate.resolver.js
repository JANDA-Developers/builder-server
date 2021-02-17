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
exports.UserUpdateResolver = exports.UserUpdateInput = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const errorHandling_1 = require("../../helpers/errorHandling");
const User_model_1 = require("../../models/User/User.model");
const const_1 = require("../../types/const");
const UserUpdateResponse = BaseResponse_type_1.GenerateResponse(User_model_1.User, "UserUpdate");
let UserUpdateInput = class UserUpdateInput {
};
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "phoneNumber", void 0);
__decorate([
    type_graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "company", void 0);
__decorate([
    type_graphql_1.Field(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], UserUpdateInput.prototype, "pageLimit", void 0);
UserUpdateInput = __decorate([
    type_graphql_1.InputType()
], UserUpdateInput);
exports.UserUpdateInput = UserUpdateInput;
let UserUpdateResolver = class UserUpdateResolver {
    async UserUpdate({ _id, role }, input, id) {
        const response = new UserUpdateResponse();
        const session = await typegoose_1.mongoose.startSession();
        session.startTransaction();
        if (role !== User_model_1.UserRole.ADMIN && id) {
            throw Error("Permission Deny");
        }
        try {
            const User = await User_model_1.UserModel.findById(id || _id);
            if (!User) {
                throw errorHandling_1.errorGenForUnexist("User");
            }
            for (const field in input) {
                if (Object.prototype.hasOwnProperty.call(input, field)) {
                    User[field] = input[field];
                }
            }
            await errorHandling_1.validateClass(User);
            await User.save({ session });
            response.setData(User);
            await session.commitTransaction();
        }
        catch (error) {
            response.setError(error);
        }
        return response;
    }
};
__decorate([
    type_graphql_1.Authorized(const_1.ALLOW_MEMBER),
    type_graphql_1.Mutation(() => UserUpdateResponse),
    __param(0, type_graphql_1.Ctx("user")),
    __param(1, type_graphql_1.Arg("input")),
    __param(2, type_graphql_1.Arg("id", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_model_1.User,
        UserUpdateInput, String]),
    __metadata("design:returntype", Promise)
], UserUpdateResolver.prototype, "UserUpdate", null);
UserUpdateResolver = __decorate([
    type_graphql_1.Resolver()
], UserUpdateResolver);
exports.UserUpdateResolver = UserUpdateResolver;
//# sourceMappingURL=UserUpdate.resolver.js.map