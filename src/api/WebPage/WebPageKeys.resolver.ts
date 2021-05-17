import { Query, Resolver } from "type-graphql";
import { WebPageModel } from "../../models/WebPage/WebPage.model";
import { GenerateArrayReturnResponse } from "../../helpers/BaseResponse.type";
import { WithMongoSession } from "../../helpers/decorators/MongoSession.decorator";
import { handleBusinessError } from "../../helpers/handBusinessError";

const WebPageKeysResponse = GenerateArrayReturnResponse(String, "WebPageKeys");
type WebPageKeysResponse = InstanceType<typeof WebPageKeysResponse>;

@Resolver()
export class WebPageFindByKeyResolver {
    @WithMongoSession()
    @Query(() => WebPageKeysResponse, {
        description: "도메인을 넣으면 도메인 으로 검사",
    })
    async WebPageKeys() {
        return await handleBusinessError(WebPageKeysResponse, async () => {
            const webPages = await WebPageModel.find({}, "domain key");
            const keys = webPages.map((webpage) => {
                return webpage.domain || webpage.key;
            });
            return keys;
        });
    }
}
