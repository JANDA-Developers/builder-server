import { Field, InterfaceType } from "type-graphql";
import { prop } from "@typegoose/typegoose";
import { Base } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectId } from "mongodb";

@InterfaceType({
    resolveType: (value) => value.constructor.name,
})
export abstract class CollectionDataInterface extends Base {
    constructor(args?: any) {
        super();
        if (args) {
            for (const key in args) {
                const element = args[key];
                this[key] = element;
            }
        }
    }
    @prop()
    readonly createdAt: Date;

    @prop()
    updatedAt: Date;
}

Field(() => ObjectId)(CollectionDataInterface.prototype, "_id");
Field(() => Date)(CollectionDataInterface.prototype, "createdAt");
Field(() => Date)(CollectionDataInterface.prototype, "updatedAt");
