import {
    Resolver,
    Mutation,
    Args,
    ArgsType,
    Field,
    Ctx,
    ObjectType,
} from "type-graphql";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import { UserModel } from "../../models/User/User.model";
import { UserError } from "../../api/Error/shared/Error.type";
import { Context } from "../../types/types";
import { generateToken } from "../../utils/generatorToken";
@ObjectType()
class SignIn {
    constructor(token: string) {
        this.token = token;
    }
    @Field()
    token: string;
}

const SignInResponse = GenerateResponse(SignIn, "SignIn");
type SignInResponse = InstanceType<typeof SignInResponse>;
@ArgsType()
export class SignInArgs {
    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;
}

@Resolver()
export class SignInResolver {
    @Mutation(() => SignInResponse)
    async SignIn(
        @Args(() => SignInArgs) input: SignInArgs,
        @Ctx() context: Context
    ): Promise<SignInResponse> {
        const response = new SignInResponse();

        try {
            const { email, password } = input;
            const user = await UserModel.findOne({
                email,
            });
            if (!user || !user.comparePassword(password)) {
                throw new UserError(
                    "Email 또는 Password를 확인해주세요",
                    "INVALID_EMAIL_OR_PASSWORD"
                );
            }

            const token = new SignIn(generateToken(user.email));
            response.setData(token);
        } catch (error) {
            response.setError(error);
        }
        return response;
    }
}
