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
exports.MeResolver = void 0;
const errorHandling_1 = require("../../helpers/errorHandling");
const type_graphql_1 = require("type-graphql");
const User_model_1 = require("../../models/User/User.model");
let MeResolver = class MeResolver {
    async Me(context) {
        if (!context.user) {
            throw errorHandling_1.errorGenForUnexist("User");
        }
        return context.user;
    }
};
__decorate([
    type_graphql_1.Query(() => User_model_1.User),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MeResolver.prototype, "Me", null);
MeResolver = __decorate([
    type_graphql_1.Resolver()
], MeResolver);
exports.MeResolver = MeResolver;
//# sourceMappingURL=Me.resolver.js.map