import { buildSchema } from "type-graphql";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "../types/scalars/ObjectId.scalar";
import { authChecker } from "./authChecker";
import { GraphQLSchema } from "graphql";
import { TypegooseMiddleware } from "../middlewares/typegooseMiddleware";

export const createSchema = async (): Promise<GraphQLSchema> =>
    buildSchema({
        emitSchemaFile: true,
        resolvers: [
            __dirname + "/../**/*.{resolver,interface,model,type}.{ts,js}",
        ],
        globalMiddlewares: [TypegooseMiddleware],
        scalarsMap: [
            {
                type: ObjectId,
                scalar: ObjectIdScalar,
            },
        ],
        authChecker,
    });
