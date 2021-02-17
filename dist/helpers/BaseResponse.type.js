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
exports.PlainResponse = exports.GenerateArrayReturnResponse = exports.GenerateResponse = exports.GenerateFindOneResponse = void 0;
const type_graphql_1 = require("type-graphql");
const Error_type_1 = require("../api/Error/shared/Error.type");
exports.GenerateFindOneResponse = (tClass, name) => {
    let BaseResponseClass = class BaseResponseClass extends PlainResponse {
        constructor(ok) {
            super(ok);
        }
        setData(data) {
            this.data = data;
        }
    };
    __decorate([
        type_graphql_1.Field(() => tClass, { nullable: true }),
        __metadata("design:type", Object)
    ], BaseResponseClass.prototype, "data", void 0);
    BaseResponseClass = __decorate([
        type_graphql_1.ObjectType(`${name || tClass.name}Response`),
        __metadata("design:paramtypes", [Boolean])
    ], BaseResponseClass);
    return BaseResponseClass;
};
exports.GenerateResponse = (tClass, name) => {
    let BaseResponseClass = class BaseResponseClass extends PlainResponse {
        constructor(ok) {
            super(ok);
        }
        setData(data) {
            this.data = data;
        }
    };
    __decorate([
        type_graphql_1.Field(() => tClass, { nullable: true }),
        __metadata("design:type", Object)
    ], BaseResponseClass.prototype, "data", void 0);
    BaseResponseClass = __decorate([
        type_graphql_1.ObjectType(`${name || tClass.name}Response`),
        __metadata("design:paramtypes", [Boolean])
    ], BaseResponseClass);
    return BaseResponseClass;
};
exports.GenerateArrayReturnResponse = (tClass, name) => {
    let BaseResponseClass = class BaseResponseClass extends PlainResponse {
        constructor(ok) {
            super(ok);
        }
        setData(data) {
            this.data = data;
        }
    };
    __decorate([
        type_graphql_1.Field(() => [tClass]),
        __metadata("design:type", Array)
    ], BaseResponseClass.prototype, "data", void 0);
    BaseResponseClass = __decorate([
        type_graphql_1.ObjectType(`${name || tClass.name}Response`),
        __metadata("design:paramtypes", [Boolean])
    ], BaseResponseClass);
    return BaseResponseClass;
};
let PlainResponse = class PlainResponse {
    constructor(ok) {
        this.ok = ok === false ? false : true;
        this.errors = [];
    }
    setError(error, ok = false) {
        if (!(error instanceof Error_type_1.UserError)) {
            throw error;
        }
        this.errors.push(error);
        this.ok = ok;
    }
};
__decorate([
    type_graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], PlainResponse.prototype, "ok", void 0);
__decorate([
    type_graphql_1.Field(() => [Error_type_1.UserError], { nullable: true }),
    __metadata("design:type", Array)
], PlainResponse.prototype, "errors", void 0);
PlainResponse = __decorate([
    type_graphql_1.ObjectType("Response"),
    __metadata("design:paramtypes", [Boolean])
], PlainResponse);
exports.PlainResponse = PlainResponse;
//# sourceMappingURL=BaseResponse.type.js.map