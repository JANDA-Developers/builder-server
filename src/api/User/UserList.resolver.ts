import { generateFilterType } from "../../helpers/decorators/FilterInputGen/generateFilterType";
import { generateSortType } from "../../helpers/decorators/FilterInputGen/generateSrotType";
import { errorGenForUnexist } from "../../helpers/errorHandling";
import {
    OffsetPaginatedData,
    OffsetPagingInput,
} from "../../helpers/PaginationWithOffset.type";
import { Resolver, Query, Ctx, Arg, Authorized } from "type-graphql";
import { Context } from "../../types/types";
import { User, UserModel, UserRole } from "../../models/User/User.model";

export const userFilterType = generateFilterType(User);
export const userSortType = generateSortType(User);

const userOffsetPaginatedData = OffsetPaginatedData(User);
type userOffsetPaginatedData = typeof userOffsetPaginatedData;

@Resolver()
export class userListResolver {
    @Authorized(UserRole.ADMIN)
    @Query(() => userOffsetPaginatedData)
    async UserList(
        @Ctx() context: Context,
        @Arg("pagingInput", () => OffsetPagingInput)
        { pageIndex, pageItemCount }: OffsetPagingInput,
        @Arg("filter", userFilterType, { nullable: true })
        filter: any = {},
        @Arg("sort", userSortType, { nullable: true })
        sort?: string[]
    ) {
        const user = context.user;
        if (!user) {
            throw errorGenForUnexist("User");
        }
        if (user.role !== UserRole.ADMIN) {
            filter.owner_eq = user._id;
        }

        const pagingResult = new userOffsetPaginatedData();

        await pagingResult.setData(
            UserModel,
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
