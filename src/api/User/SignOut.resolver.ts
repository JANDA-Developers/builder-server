import { Resolver, Mutation, Ctx } from "type-graphql";
import { PlainResponse } from "../../helpers/BaseResponse.type";
import { Context } from "../../types/types";

@Resolver()
export class SignOutResolver {
    @Mutation(() => PlainResponse)
    async SignOut(@Ctx() context: Context): Promise<PlainResponse> {
        const response = new PlainResponse();

        try {
            return response;
        } catch (error) {
            response.setError(error);
            return response;
        }
    }
}
