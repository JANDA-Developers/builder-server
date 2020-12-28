import {
    Langs,
    WebPage,
    WebPageModel,
    WebPageType,
} from "../../models/WebPage/WebPage.model";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import { validateClass } from "../../helpers/errorHandling";
import { errorGenForUnexist } from "../../helpers/errorHandling";
import {
    Resolver,
    Mutation,
    Field,
    Ctx,
    Arg,
    Authorized,
    InputType,
} from "type-graphql";
import { mongoose } from "@typegoose/typegoose";
import { getMongoInstance } from "../../utils/modelFunction";
import { Context } from "../../types/types";
import { GraphQLJSONObject } from "graphql-type-json";
import { ALLOW_ALL } from "../../types/const";

const WebPageCreateResponse = GenerateResponse(WebPage, "WebPageCreate");
type WebPageCreateResponse = InstanceType<typeof WebPageCreateResponse>;

@InputType()
export class WebPageCreateInput {
    @Field()
    public description: string;

    @Field()
    public title: string;

    @Field(() => [String])
    public keywards: string[];

    @Field(() => WebPageType)
    public type: WebPageType;

    @Field()
    public templateKey: string;

    @Field(() => [Langs], { defaultValue: Langs.KR })
    public supportLanguage: Langs[];

    @Field(() => GraphQLJSONObject)
    public value: any;
}

@Resolver()
export class WebPageCreateResolver {
    @Authorized(ALLOW_ALL)
    @Mutation(() => WebPageCreateResponse)
    async WebPageCreate(
        @Ctx() context: Context,
        @Arg("input") input: WebPageCreateInput
    ): Promise<WebPageCreateResponse> {
        const response = new WebPageCreateResponse();
        const session = await mongoose.startSession();
        await session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw errorGenForUnexist("User");
            }

            const webpage = new WebPage(input);
            webpage.owner = user;
            await validateClass(webpage);
            const webpageInstance = getMongoInstance(WebPageModel, webpage);
            await webpageInstance.save({ session });
            response.setData(webpageInstance.toObject());
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
