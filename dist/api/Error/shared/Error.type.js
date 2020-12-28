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
exports.UserError = void 0;
const type_graphql_1 = require("type-graphql");
let UserError = class UserError {
    constructor(message, code, validationErrors) {
        this.message = message;
        if (code) {
            this.code = code;
        }
        if (validationErrors) {
            console.log(JSON.stringify(validationErrors));
            this.details = validationErrors.flatMap((err) => {
                var _a;
                const messages = [];
                if (err.constraints) {
                    for (const key in err.constraints) {
                        const message = err.constraints[key];
                        messages.push(`[${(_a = err.target) === null || _a === void 0 ? void 0 : _a.constructor.name}.${err.property}] ${message} (validator=${key}, input=${err.value})`);
                    }
                }
                return messages;
            });
        }
    }
};
__decorate([
    type_graphql_1.Field(() => String, { defaultValue: "UNKNOWN_ERROR" }),
    __metadata("design:type", String)
], UserError.prototype, "code", void 0);
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", String)
], UserError.prototype, "message", void 0);
__decorate([
    type_graphql_1.Field(() => [String], { description: "에러 디테일들... ", nullable: true }),
    __metadata("design:type", Array)
], UserError.prototype, "details", void 0);
UserError = __decorate([
    type_graphql_1.ObjectType({ description: "Display error to client-side." }),
    __metadata("design:paramtypes", [String, String, Array])
], UserError);
exports.UserError = UserError;
//# sourceMappingURL=Error.type.js.map