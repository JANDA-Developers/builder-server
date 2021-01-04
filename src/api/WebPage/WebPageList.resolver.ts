import { generateFilterType } from "../../helpers/decorators/FilterInputGen/generateFilterType";
import { generateSortType } from "../../helpers/decorators/FilterInputGen/generateSrotType";
import { errorGenForUnexist } from "../../helpers/errorHandling";
import {
    OffsetPaginatedData,
    OffsetPagingInput,
} from "../../helpers/PaginationWithOffset.type";
import { WebPage, WebPageModel } from "../../models/WebPage/WebPage.model";
import { Resolver, Query, Ctx, Arg, Authorized, Info } from "type-graphql";
import { Context } from "../../types/types";
import { UserRole } from "../../models/User/User.model";
import { ALLOW_ALL } from "../../types/const";

export const WebPageFilterType = generateFilterType(WebPage);
export const WebPageSortType = generateSortType(WebPage);

const WebPageOffsetPaginatedData = OffsetPaginatedData(WebPage);
type WebPageOffsetPaginatedData = typeof WebPageOffsetPaginatedData;

@Resolver()
export class WebPageListResolver {
    @Authorized(ALLOW_ALL)
    @Query(() => WebPageOffsetPaginatedData)
    async WebPageList(
        @Info() info: any,
        @Ctx() context: Context,
        @Arg("pagingInput", () => OffsetPagingInput)
        { pageIndex, pageItemCount }: OffsetPagingInput,
        @Arg("filter", WebPageFilterType, { nullable: true })
        filter: any = {},
        @Arg("sort", WebPageSortType, { nullable: true })
        sort?: string[]
    ) {
        const user = context.user;
        if (!user) {
            throw errorGenForUnexist("User");
        }
        if (user.role !== UserRole.ADMIN) {
            filter.owner_eq = user._id;
        }

        const pagingResult = new WebPageOffsetPaginatedData();

        await pagingResult.setData(
            WebPageModel,
            {
                pageItemCount,
                pageIndex,
                filter,
                sort,
                query: {},
            },
            ["author", "category"]
        );

        return pagingResult;
    }
}
