"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gCall = void 0;
const graphql_1 = require("graphql");
const createSchema_1 = require("../utils/createSchema");
const User_model_1 = require("../models/User/User.model");
let schema;
exports.gCall = async ({ source, variableValues, userId }) => {
    if (!schema) {
        schema = await createSchema_1.createSchema();
    }
    return graphql_1.graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            req: {
                headers: {
                    "x-forwarded-for": "127.0.0.1",
                },
                session: {
                    seller: userId,
                },
            },
            user: await User_model_1.UserModel.findById(userId),
            res: {
                clearCookie: jest.fn(),
            },
        },
    });
};
//# sourceMappingURL=gCall.js.map