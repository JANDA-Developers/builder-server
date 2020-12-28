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
var _FilterInput_1, _StringTypeFilterInput_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports._StringTypeFilterInput = exports._FilterInput = void 0;
const type_graphql_1 = require("type-graphql");
let _FilterInput = _FilterInput_1 = class _FilterInput {
};
__decorate([
    type_graphql_1.Field(() => [_FilterInput_1], {
        nullable: true,
    }),
    __metadata("design:type", Array)
], _FilterInput.prototype, "AND", void 0);
__decorate([
    type_graphql_1.Field(() => [_FilterInput_1], {
        nullable: true,
    }),
    __metadata("design:type", Array)
], _FilterInput.prototype, "OR", void 0);
_FilterInput = _FilterInput_1 = __decorate([
    type_graphql_1.InputType({
        isAbstract: true,
        description: "필터 인풋 타입!",
    })
], _FilterInput);
exports._FilterInput = _FilterInput;
let _StringTypeFilterInput = _StringTypeFilterInput_1 = class _StringTypeFilterInput extends _FilterInput {
};
__decorate([
    type_graphql_1.Field(() => [_StringTypeFilterInput_1]),
    __metadata("design:type", Array)
], _StringTypeFilterInput.prototype, "AND", void 0);
__decorate([
    type_graphql_1.Field(() => [_StringTypeFilterInput_1]),
    __metadata("design:type", Array)
], _StringTypeFilterInput.prototype, "OR", void 0);
_StringTypeFilterInput = _StringTypeFilterInput_1 = __decorate([
    type_graphql_1.InputType({
        isAbstract: true,
        description: "Filter by Name",
    })
], _StringTypeFilterInput);
exports._StringTypeFilterInput = _StringTypeFilterInput;
//# sourceMappingURL=FilterInputTypes.type.js.map