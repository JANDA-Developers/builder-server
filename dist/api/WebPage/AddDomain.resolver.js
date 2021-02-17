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
exports.AddDomainResolver = exports.AddDomainInput = void 0;
const type_graphql_1 = require("type-graphql");
const BaseResponse_type_1 = require("../../helpers/BaseResponse.type");
const WebPage_model_1 = require("../../models/WebPage/WebPage.model");
const typegoose_1 = require("@typegoose/typegoose");
const errorHandling_1 = require("../../helpers/errorHandling");
const mongodb_1 = require("mongodb");
const const_1 = require("../../types/const");
const createSubDomain_1 = require("../../utils/createSubDomain");
const AddDomainResponse = BaseResponse_type_1.GenerateResponse(WebPage_model_1.WebPage, "AddDomain");
let AddDomainInput = class AddDomainInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], AddDomainInput.prototype, "domain", void 0);
AddDomainInput = __decorate([
    type_graphql_1.InputType()
], AddDomainInput);
exports.AddDomainInput = AddDomainInput;
let AddDomainResolver = class AddDomainResolver {
    async AddDomain(context, WebPageId, domain) {
        const response = new AddDomainResponse();
        const session = await typegoose_1.mongoose.startSession();
        session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw errorHandling_1.errorGenForUnexist("User");
            }
            const WebPage = await WebPage_model_1.WebPageModel.findById(WebPageId);
            if (!WebPage) {
                throw errorHandling_1.errorGenForUnexist("WebPage");
            }
            const result = await createSubDomain_1.createSubDomain(domain, (err, data) => {
                if (err)
                    console.error(err, err.stack);
            });
            if (!result.ChangeInfo.Status /*실패이면*/) {
                throw Error(JSON.stringify(result));
            }
            WebPage.domain = domain;
            await WebPage.save({ session });
            response.setData(WebPage);
            await session.commitTransaction();
        }
        catch (error) {
            response.setError(error);
            await session.abortTransaction();
        }
        finally {
            session.endSession();
        }
        return response;
    }
};
__decorate([
    type_graphql_1.Authorized(const_1.ALLOW_ALL),
    type_graphql_1.Mutation(() => AddDomainResponse),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id", () => mongodb_1.ObjectId)),
    __param(2, type_graphql_1.Arg("domain")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongodb_1.ObjectId, String]),
    __metadata("design:returntype", Promise)
], AddDomainResolver.prototype, "AddDomain", null);
AddDomainResolver = __decorate([
    type_graphql_1.Resolver()
], AddDomainResolver);
exports.AddDomainResolver = AddDomainResolver;
//# sourceMappingURL=AddDomain.resolver.js.map