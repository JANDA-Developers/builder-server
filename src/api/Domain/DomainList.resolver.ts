import { generateFilterType } from "../../helpers/decorators/FilterInputGen/generateFilterType";
import { generateSortType } from "../../helpers/decorators/FilterInputGen/generateSrotType";
import { errorGenForUnexist } from "../../helpers/errorHandling";
import {
    OffsetPaginatedData,
    OffsetPagingInput,
} from "../../helpers/PaginationWithOffset.type";
import { Resolver, Query, Ctx, Arg, Authorized } from "type-graphql";
import { Context } from "../../types/types";
import { Domain, DomainModel } from "../../models/Domain/Domain.model";
import { UserRole } from "../../models/User/User.model";

export const DomainFilterType = generateFilterType(Domain);
export const DomainSortType = generateSortType(Domain);

const DomainOffsetPaginatedData = OffsetPaginatedData(Domain);
type DomainOffsetPaginatedData = typeof DomainOffsetPaginatedData;

@Resolver()
export class domainListResolver {
    @Authorized(UserRole.MEMBER)
    @Query(() => DomainOffsetPaginatedData)
    async DomainList(
        @Ctx() context: Context,
        @Arg("pagingInput", () => OffsetPagingInput)
        { pageIndex, pageItemCount }: OffsetPagingInput,
        @Arg("filter", DomainFilterType, { nullable: true })
        filter: any = {},
        @Arg("sort", DomainSortType, { nullable: true })
        sort?: string[]
    ) {
        const user = context.user;
        if (!user) {
            throw errorGenForUnexist("Domain");
        }
        if (user.role !== UserRole.ADMIN) {
            filter.owner_eq = user._id;
        }

        const pagingResult = new domainOffsetPaginatedData();

        await pagingResult.setData(DomainModel, {
            pageItemCount,
            pageIndex,
            filter,
            sort,
            query: {},
        });

        return pagingResult;
    }
}
