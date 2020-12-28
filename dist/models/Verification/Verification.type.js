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
exports.VerificationModel = exports.Verification = exports.VerificationEvent = exports.VerificationTarget = void 0;
const type_graphql_1 = require("type-graphql");
const CollectionData_type_1 = require("../../helpers/CollectionData.type");
const typegoose_1 = require("@typegoose/typegoose");
const Error_type_1 = require("../../api/Error/shared/Error.type");
const class_validator_1 = require("class-validator");
var VerificationTarget;
(function (VerificationTarget) {
    VerificationTarget[VerificationTarget["PHONE"] = 0] = "PHONE";
    VerificationTarget[VerificationTarget["EMAIL"] = 1] = "EMAIL";
})(VerificationTarget = exports.VerificationTarget || (exports.VerificationTarget = {}));
var VerificationEvent;
(function (VerificationEvent) {
    VerificationEvent[VerificationEvent["UserVerifyPhone"] = 0] = "UserVerifyPhone";
    VerificationEvent[VerificationEvent["UserVerifyEmail"] = 1] = "UserVerifyEmail";
    VerificationEvent[VerificationEvent["UserFindPassword"] = 2] = "UserFindPassword";
    VerificationEvent[VerificationEvent["UserFindEmail"] = 3] = "UserFindEmail";
    VerificationEvent[VerificationEvent["UserUpdateInfo"] = 4] = "UserUpdateInfo";
})(VerificationEvent = exports.VerificationEvent || (exports.VerificationEvent = {}));
type_graphql_1.registerEnumType(VerificationTarget, {
    name: "VerificationTarget",
    description: "인증 타겟 Enum",
});
type_graphql_1.registerEnumType(VerificationEvent, {
    name: "VerificationEvent",
    description: "인증 타겟 Enum",
});
let Verification = class Verification extends CollectionData_type_1.CollectionDataInterface {
    codeGenerate() {
        let temp;
        switch (this.target) {
            case VerificationTarget.PHONE: {
                // 인증문자 전송
                temp = Math.floor(Math.random() * 1000000)
                    .toString()
                    .padStart(6, "0");
                break;
            }
            case VerificationTarget.EMAIL: {
                temp = Math.random()
                    .toString(36)
                    .substr(2)
                    .slice(0, 7)
                    .toUpperCase();
                break;
            }
            default: {
                throw new Error_type_1.UserError("VerificationTarget이 지정되지 않았습니다.", "UNDEFINED_FIELD");
            }
        }
        this.code = temp;
    }
    codeConfirm(code) {
        if (this.isExpire()) {
            throw new Error_type_1.UserError("인증 시간이 만료되었습니다.", "VERIFICATION_EXPIRED");
        }
        this.isVerified = this.code === code;
    }
    isExpire() {
        return this.expiresAt.getTime() < Date.now();
    }
    verify(code) {
        if (code === this.code) {
            this.isVerified = true;
        }
        return this.isVerified;
    }
};
__decorate([
    typegoose_1.prop(),
    type_graphql_1.Field(() => String),
    class_validator_1.IsString(),
    class_validator_1.Length(6, 15),
    __metadata("design:type", String)
], Verification.prototype, "payload", void 0);
__decorate([
    typegoose_1.prop(),
    type_graphql_1.Field(() => VerificationTarget),
    __metadata("design:type", Number)
], Verification.prototype, "target", void 0);
__decorate([
    typegoose_1.prop(),
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], Verification.prototype, "isVerified", void 0);
__decorate([
    typegoose_1.prop(),
    type_graphql_1.Field(() => VerificationEvent, {
        description: `어떤 액션을 위해 인증을 하는 것인지 표시 
            \t - ex) UserVerifyPhone, UserVerifyEmail, UserFindPassword, UserFindEmail, UserUpdateInfo`,
    }),
    class_validator_1.IsString(),
    __metadata("design:type", Number)
], Verification.prototype, "event", void 0);
__decorate([
    typegoose_1.prop(),
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], Verification.prototype, "storeGroupCode", void 0);
__decorate([
    typegoose_1.prop(),
    type_graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], Verification.prototype, "expiresAt", void 0);
__decorate([
    typegoose_1.prop(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Verification.prototype, "code", void 0);
Verification = __decorate([
    type_graphql_1.ObjectType({
        implements: CollectionData_type_1.CollectionDataInterface,
    }),
    typegoose_1.index({
        expiresAt: 1,
    }, {
        expireAfterSeconds: 60 * 60 * 24,
    }),
    typegoose_1.modelOptions({
        schemaOptions: {
            timestamps: true,
            collection: "Verification",
        },
    })
], Verification);
exports.Verification = Verification;
exports.VerificationModel = typegoose_1.getModelForClass(Verification);
//# sourceMappingURL=Verification.type.js.map