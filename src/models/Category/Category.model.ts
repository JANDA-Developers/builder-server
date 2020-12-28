import { ObjectType, Field, registerEnumType } from "type-graphql";
import { modelOptions, getModelForClass, prop } from "@typegoose/typegoose";
import { CollectionDataInterface } from "../../helpers/CollectionData.type";
import { Sorting } from "../../helpers/decorators/sortDecorator";
import { ValueFilter } from "../../helpers/decorators/FilterInputGen/FilterDecorators";
import { ObjectId } from "mongodb";
export enum SuperClass {
    BOOKING,
    TEMPLATEA,
    TIMESPACE,
}

@ObjectType({
    implements: CollectionDataInterface,
})
@modelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "Category",
    },
    options: {
        allowMixed: 0,
    },
})
export class Category extends CollectionDataInterface {
    @Field()
    @prop()
    label: string;

    @Field(() => SuperClass)
    @prop({ default: SuperClass.BOOKING })
    superClass: SuperClass;
}
ValueFilter(["eq", "in", "not_in"], () => ObjectId)(Category.prototype, "_id");
Sorting()(Category.prototype, "createdAt");
Sorting()(Category.prototype, "updatedAt");

registerEnumType(SuperClass, {
    name: "SuperClass",
    description: "슈퍼 분류!",
});

export const CategoryModel = getModelForClass(Category);
