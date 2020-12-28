import { Arg, Query, Resolver } from "type-graphql";
import { mongoose } from "@typegoose/typegoose";
import { WebPage, WebPageModel } from "../../models/WebPage/WebPage.model";
import { GenerateFindOneResponse } from "../../helpers/BaseResponse.type";

const WebPageFindByKeyResponse = GenerateFindOneResponse(
    WebPage,
    "WebPageFindByKey"
);
type WebPageFindByKeyResponse = InstanceType<typeof WebPageFindByKeyResponse>;

@Resolver()
export class WebPageFindByKeyResolver {
    @Query(() => WebPageFindByKeyResponse)
    async WebPageFindByKey(@Arg("key") key: string) {
        const response = new WebPageFindByKeyResponse();
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const webPage = await WebPageModel.findOne({
                key,
            });
            if (webPage !== null && webPage !== undefined) {
                response.setData(webPage);
                await session.commitTransaction();
            }
        } catch (e) {
            await session.abortTransaction();
            response.setError({
                code: "",
                details: [],
                message: JSON.stringify(e),
            });
        } finally {
            session.endSession();
            return response;
        }
    }
}
