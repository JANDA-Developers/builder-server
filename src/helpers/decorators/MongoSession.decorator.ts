import { mongoose } from "@typegoose/typegoose";
import { createMethodDecorator } from "type-graphql";
import { Context } from "../../types/types";

export function WithMongoSession() {
    return createMethodDecorator<Context>(async ({ context }, next) => {
        context.session = await mongoose.startSession();

        try {
            await context.session.withTransaction(async () => {
                await next();
            });
        } finally {
            context.session.endSession();
        }
    });
}
