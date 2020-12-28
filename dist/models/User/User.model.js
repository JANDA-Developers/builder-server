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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = exports.UserRole = void 0;
const type_graphql_1 = require("type-graphql");
const CollectionData_type_1 = require("../../helpers/CollectionData.type");
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
const crypto_1 = require("crypto");
var UserRole;
(function (UserRole) {
    UserRole[UserRole["ADMIN"] = 0] = "ADMIN";
    UserRole[UserRole["MEMBER"] = 1] = "MEMBER";
    UserRole[UserRole["UNCONFIRMED"] = 2] = "UNCONFIRMED";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
let User = class User extends CollectionData_type_1.CollectionDataInterface {
    hashPassword() {
        this.password = this.hash(this.password);
    }
    comparePassword(password) {
        return this.password === this.hash(password);
    }
    hash(password) {
        return crypto_1.createHash("sha512").update(password).digest("hex");
    }
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typegoose_1.prop({ default: () => false }),
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    class_validator_1.IsPhoneNumber(null),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    type_graphql_1.Field(() => UserRole),
    typegoose_1.prop({ default: UserRole.UNCONFIRMED }),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    typegoose_1.prop({ default: [] }),
    __metadata("design:type", Array)
], User.prototype, "studentIds", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    type_graphql_1.ObjectType({
        implements: CollectionData_type_1.CollectionDataInterface,
    }),
    typegoose_1.modelOptions({
        schemaOptions: {
            timestamps: true,
            collection: "User",
        },
    })
], User);
exports.User = User;
exports.UserModel = typegoose_1.getModelForClass(User);
type_graphql_1.registerEnumType(UserRole, {
    name: "UserRole",
    description: "유저 역할!",
});
//# sourceMappingURL=User.model.js.map