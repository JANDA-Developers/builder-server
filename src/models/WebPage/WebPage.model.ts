import { ObjectType, Field, registerEnumType } from "type-graphql";
import {
    modelOptions,
    getModelForClass,
    prop,
    Ref,
} from "@typegoose/typegoose";
import { CollectionDataInterface } from "../../helpers/CollectionData.type";
import { User } from "../User/User.model";
import { Sorting } from "../../helpers/decorators/sortDecorator";
import { ValueFilter } from "../../helpers/decorators/FilterInputGen/FilterDecorators";
import { ObjectId } from "mongodb";
import { generateRandomStringCode } from "../../utils/generateRandomCode";
import { GraphQLJSONObject } from "graphql-type-json";

export enum Langs {
    KR = "KR",
    GB = "GB",
}

export enum WebPageType {
    PERSONAL = "PERSONAL",
    BUSI = "BUSI",
}

@ObjectType({
    implements: CollectionDataInterface,
})
@modelOptions({
    schemaOptions: {
        timestamps: true,
        collection: "WebPage",
    },
    options: {
        allowMixed: 0,
    },
})
export class WebPage extends CollectionDataInterface {
    @Field()
    @prop()
    @ValueFilter(["in", "not_in", "contains", "eq"], () => String)
    title: string;

    @prop()
    @Field(() => [String], { nullable: true })
    @ValueFilter(["in", "not_in", "contains", "eq"], () => String)
    keyWards: string[];

    @Field()
    @prop()
    description: string;

    @Field()
    @prop({ default: () => generateRandomStringCode(6) })
    public key: string;

    @prop()
    @Field({
        description: "이건 이넘없이 프론트에서 전달받은 키를 그대로 사용한다.",
    })
    public templateKey: string;

    @prop()
    @Field(() => [Langs])
    public supportLanguage: Langs[];

    @prop({ required: true, type: Object })
    @Field(() => GraphQLJSONObject)
    public value: any;

    @Field()
    @prop()
    type: WebPageType;

    @Field(() => User)
    @prop({ ref: "User", required: true })
    @ValueFilter(["eq", "in"], () => String)
    public owner: Ref<User>;
}

ValueFilter(["eq", "in", "not_in"], () => ObjectId)(WebPage.prototype, "_id");
ValueFilter(["lte", "lt", "gte", "gt"], () => Date)(
    WebPage.prototype,
    "createdAt"
);
Sorting()(WebPage.prototype, "createdAt");
Sorting()(WebPage.prototype, "updatedAt");

export const WebPageModel = getModelForClass(WebPage);

registerEnumType(WebPageType, {
    name: "WebPageType",
    description: "웹페이지의 역할",
});

registerEnumType(Langs, {
    name: "Langs",
    description: "언어목록",
});
