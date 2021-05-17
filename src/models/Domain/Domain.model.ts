import { ObjectType, Field } from "type-graphql";
import { CollectionDataInterface } from "../../helpers/CollectionData.type";
import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { Route53 } from "aws-sdk";
import { ValueFilter } from "../../helpers/decorators/FilterInputGen/FilterDecorators";
import { ObjectId } from "mongodb";

export enum UserRole {
    ADMIN,
    MEMBER,
    UNCONFIRMED,
}

@ObjectType({
    implements: CollectionDataInterface,
})
@modelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "Domain",
    },
})
export class Domain extends CollectionDataInterface
    implements Route53.HostedZone {
    @Field()
    @prop()
    CallerReference: string;

    @Field(() => String)
    @prop()
    Id: string;

    @ValueFilter(["eq", "contains"])
    @Field()
    @prop()
    Name: string;

    @ValueFilter(["eq", "contains"])
    @Field({ nullable: true })
    @prop()
    attachPageName?: string;

    @ValueFilter(["eq"])
    @Field({ nullable: true })
    @prop()
    attachPageId?: string;

    @Field()
    @prop()
    ownerId: ObjectId;

    @ValueFilter(["eq", "contains"])
    @Field()
    @prop()
    ownerName: string;
}

export const DomainModel = getModelForClass(Domain);
