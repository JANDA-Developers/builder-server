import { ObjectType, Field, registerEnumType } from "type-graphql";
import { CollectionDataInterface } from "../../helpers/CollectionData.type";
import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { createHash } from "crypto";
import { ValueFilter } from "../../helpers/decorators/FilterInputGen/FilterDecorators";
import { Sorting } from "../../helpers/decorators/sortDecorator";
import { WebPage, WebPageModel } from "../WebPage/WebPage.model";
import { compare } from "bcryptjs";

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
        collection: "User",
    },
})
export class User extends CollectionDataInterface {
    @Field({ nullable: true })
    @prop()
    @Sorting()
    @ValueFilter(["eq", "in", "contains"])
    name: string;

    @Field()
    @prop()
    @IsEmail()
    @ValueFilter(["eq", "in", "contains"])
    email: string;

    @prop({ default: false })
    @Field(() => Boolean)
    isVerified: boolean;

    @prop({ default: () => false })
    @Field(() => Boolean)
    isVerifiAsAdmin: boolean;

    @Field()
    @prop({ default: 3 })
    pageLimit: number;

    @Field(() => [WebPage], { nullable: true })
    async webpages() {
        return WebPageModel.find({ owner: this._id });
    }

    @Field()
    @prop()
    @IsPhoneNumber(null)
    phoneNumber: string;

    @Field(() => UserRole)
    @prop({ default: UserRole.UNCONFIRMED })
    role: UserRole;

    @prop()
    password: string;

    hashPassword() {
        this.password = this.hash(this.password);
    }

    async comparePassword(password: string): Promise<boolean> {
        return compare(password, this.password);
    }

    private hash(password: string) {
        return createHash("sha512").update(password).digest("hex");
    }
}

export const UserModel = getModelForClass(User);

registerEnumType(UserRole, {
    name: "UserRole",
    description: "유저 역할!",
});
