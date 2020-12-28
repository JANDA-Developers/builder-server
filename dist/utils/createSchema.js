"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchema = void 0;
const type_graphql_1 = require("type-graphql");
const mongodb_1 = require("mongodb");
const ObjectId_scalar_1 = require("../types/scalars/ObjectId.scalar");
const authChecker_1 = require("./authChecker");
const typegooseMiddleware_1 = require("../middlewares/typegooseMiddleware");
exports.createSchema = async () => type_graphql_1.buildSchema({
    emitSchemaFile: true,
    resolvers: [
        __dirname + "/../**/*.{resolver,interface,model,type}.{ts,js}",
    ],
    globalMiddlewares: [typegooseMiddleware_1.TypegooseMiddleware],
    scalarsMap: [
        {
            type: mongodb_1.ObjectId,
            scalar: ObjectId_scalar_1.ObjectIdScalar,
        },
    ],
    authChecker: authChecker_1.authChecker,
});
//# sourceMappingURL=createSchema.js.map