import { Arg, Query, Resolver } from "type-graphql";
import { DocumentType, mongoose } from "@typegoose/typegoose";
import { WebPage, WebPageModel } from "../../models/WebPage/WebPage.model";
import { GenerateFindOneResponse } from "../../helpers/BaseResponse.type";
import { isDomain } from "../../utils/isDomain";

const WebPageFindByKeyResponse = GenerateFindOneResponse(
    WebPage,
    "WebPageFindByKey"
);
type WebPageFindByKeyResponse = InstanceType<typeof WebPageFindByKeyResponse>;

@Resolver()
export class WebPageFindByKeyResolver {
    @Query(() => WebPageFindByKeyResponse, {
        description: "도메인을 넣으면 도메인 으로 검사",
    })
    async WebPageFindByKey(@Arg("key") key: string) {
        const response = new WebPageFindByKeyResponse();
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            let webPage: DocumentType<WebPage> | null = null;
            if (isDomain(key)) {
                webPage = await WebPageModel.findOne({
                    domain: key,
                });
            } else {
                webPage = await WebPageModel.findOne({
                    key,
                });
            }
            if (!webPage) throw Error(`Webpage is not found with key ${key}`);
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
        }
        return response;
    }
}
