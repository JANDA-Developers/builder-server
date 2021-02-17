import {
    Resolver,
    Mutation,
    Field,
    Ctx,
    Arg,
    InputType,
    Authorized,
} from "type-graphql";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import {
    Langs,
    WebPage,
    WebPageModel,
    WebPageType,
} from "../../models/WebPage/WebPage.model";
import { mongoose } from "@typegoose/typegoose";
import { Context } from "../../types/types";
import { errorGenForUnexist } from "../../helpers/errorHandling";
import { ObjectId } from "mongodb";
import { GraphQLJSONObject } from "graphql-type-json";
import { ALLOW_ALL } from "../../types/const";

const WebPageUpdateResponse = GenerateResponse(WebPage, "WebPageUpdate");
type WebPageUpdateResponse = InstanceType<typeof WebPageUpdateResponse>;

@InputType()
export class WebPageUpdateInput {
    @Field({ nullable: true })
    public domain?: string;

    @Field({ nullable: true })
    public description: string;

    @Field({ nullable: true })
    public title: string;

    @Field(() => [String], { nullable: true })
    public keyWards: string[];

    @Field(() => WebPageType, { nullable: true })
    public type: WebPageType;

    @Field({ nullable: true })
    public templateKey: string;

    @Field(() => [Langs], { nullable: true })
    public supportLanguage: Langs[];

    @Field(() => GraphQLJSONObject, { nullable: true })
    public value: any;
}

@Resolver()
export class WebPageUpdateResolver {
    @Authorized(ALLOW_ALL)
    @Mutation(() => WebPageUpdateResponse)
    async WebPageUpdate(
        @Ctx() context: Context,
        @Arg("id", () => ObjectId) WebPageId: ObjectId,
        @Arg("input") input: WebPageUpdateInput
    ): Promise<WebPageUpdateResponse> {
        const response = new WebPageUpdateResponse();
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw errorGenForUnexist("User");
            }
            const WebPage = await WebPageModel.findById(WebPageId);
            if (!WebPage) {
                throw errorGenForUnexist("WebPage");
            }

            for (const field in input) {
                if (Object.prototype.hasOwnProperty.call(input, field)) {
                    WebPage[field] = input[field];
                }
            }

            await WebPage.save({ session });
            response.setData(WebPage);
            await session.commitTransaction();
        } catch (error) {
            response.setError(error);
            await session.abortTransaction();
        } finally {
            session.endSession();
        }
        return response;
    }
}
