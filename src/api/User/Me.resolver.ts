import { errorGenForUnexist } from "../../helpers/errorHandling";
import { Resolver, Ctx, Query } from "type-graphql";
import { User } from "../../models/User/User.model";
import { Context } from "../../types/types";

@Resolver()
export class MeResolver {
    @Query(() => User)
    async Me(@Ctx() context: Context): Promise<User> {
        if (!context.user) {
            throw errorGenForUnexist("User");
        }
        return context.user;
    }
}
