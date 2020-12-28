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
exports.Hello = void 0;
const type_graphql_1 = require("type-graphql");
let Hello = class Hello {
    async formats() {
        return "HelloWorld~";
    }
    async Test(param) {
        if (param === "err") {
            throw new Error(`${param}: Error!!`);
        }
        return param;
    }
};
__decorate([
    type_graphql_1.Query(() => String, { name: "Hello", description: "Hello, World~!" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Hello.prototype, "formats", null);
__decorate([
    type_graphql_1.Query(() => String, { name: "TestQuery", description: "Logging Test" }),
    __param(0, type_graphql_1.Arg("err", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Hello.prototype, "Test", null);
Hello = __decorate([
    type_graphql_1.Resolver()
], Hello);
exports.Hello = Hello;
//# sourceMappingURL=Hello.resolver.js.map