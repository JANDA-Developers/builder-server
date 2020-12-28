import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { ObjectId } from "mongodb";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import { WebPage, WebPageModel } from "../../models/WebPage/WebPage.model";
import { mongoose } from "@typegoose/typegoose";
import { Context } from "../../types/types";
import { errorGenForUnexist } from "../../helpers/errorHandling";
import { ALLOW_ALL } from "../../types/const";

const WebPageDeleteResponse = GenerateResponse(WebPage, "WebPageDelete");
type WebPageDeleteResponse = InstanceType<typeof WebPageDeleteResponse>;

@Resolver()
export class WebPageDeleteResolver {
    @Authorized(ALLOW_ALL)
    @Mutation(() => WebPageDeleteResponse)
    async WebPageDelete(
        @Ctx() context: Context,
        @Arg("WebPageId", () => ObjectId) WebPageId: ObjectId
    ): Promise<WebPageDeleteResponse> {
        const response = new WebPageDeleteResponse();
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw errorGenForUnexist("User");
            }
            const WebPage = await WebPageModel.findOne({
                _id: WebPageId,
            });

            if (!WebPage) {
                throw errorGenForUnexist("WebPage");
            }

            await WebPage.deleteOne();
            // Your Code Here~!
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
