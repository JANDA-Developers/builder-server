"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorGenForUnexist = exports.validationFailMessageFormat = exports.validateClass = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const class_validator_1 = require("class-validator");
const Error_type_1 = require("../api/Error/shared/Error.type");
exports.validateClass = async (itemClass) => {
    const errors = [];
    errors.push(...(await class_validator_1.validate(itemClass)));
    if (errors.length !== 0) {
        throw new Error_type_1.UserError("Validation Error", "VALIDATION_ERROR", errors);
    }
};
exports.validationFailMessageFormat = (validationArgs) => `target = ${validationArgs.targetName}, input= ${validationArgs.value}`;
exports.errorGenForUnexist = (target) => new apollo_server_express_1.ApolloError(`${target}Id is unexists`, `${target.toUpperCase()}_UNDEFINED`);
//# sourceMappingURL=errorHandling.js.map