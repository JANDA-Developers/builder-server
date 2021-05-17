import {
    Resolver,
    Mutation,
    Args,
    ArgsType,
    Field,
    ObjectType,
} from "type-graphql";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import { UserModel, UserRole } from "../../models/User/User.model";
import { UserError } from "../../api/Error/shared/Error.type";
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
        @Args(() => SignInArgs) input: SignInArgs
    ): Promise<SignInResponse> {
        const response = new SignInResponse();

        console.log("called");
        try {
            const { email, password } = input;
            const user = await UserModel.findOne({
                email,
            });
            console.log({ password });
            if (!user) {
                throw new UserError("존재하지 않는 계정입니다.");
            }
            const pwResult = await user.comparePassword(password);
            if (!pwResult) {
                throw new UserError("패스워드가 일치하지 않습니다.");
            }

            if (user.role !== UserRole.ADMIN)
                if (!user.isVerifiAsAdmin) {
                    throw new UserError(
                        "해당 계정에 승인조치가 이루어지지 않았습니다."
                    );
                }

            const token = new SignIn(generateToken(user.email));
            response.setData(token);
        } catch (error) {
            response.setError(error);
        }
        console.log({ response });
        return response;
    }
}
