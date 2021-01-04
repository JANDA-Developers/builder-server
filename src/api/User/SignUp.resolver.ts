import { Resolver, Mutation, Field, InputType, Arg } from "type-graphql";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import { User, UserRole, UserModel } from "../../models/User/User.model";
import { mongoose } from "@typegoose/typegoose";
import { validateClass } from "../../helpers/errorHandling";
import { UserError } from "../../api/Error/shared/Error.type";

const SignUpResponse = GenerateResponse(User, "SignUp");
type SignUpResponse = InstanceType<typeof SignUpResponse>;

@InputType()
export class SignUpInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    phoneNumber: string;

    @Field(() => String)
    password: string;

    @Field(() => String, { nullable: true })
    company?: string;
}

@Resolver()
export class SignUpResolver {
    @Mutation(() => SignUpResponse)
    async SignUp(
        @Arg("input", () => SignUpInput) input: SignUpInput
    ): Promise<SignUpResponse> {
        const response = new SignUpResponse();

        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const user = new UserModel(input);
            user.role = UserRole.UNCONFIRMED;
            user.hashPassword();
            await validateClass(user);
            const isDuplidated = await UserModel.findOne(
                {
                    email: input.email,
                },
                { _id: 1 }
            );
            if (isDuplidated) {
                throw new UserError(
                    "Already existing user infomation",
                    "ALREADY_SIGNED_UP"
                );
            }
            await user.save({ session });
            response.setData(user);
            await session.commitTransaction();
        } catch (error) {
            response.setError(error);
            await session.abortTransaction();
        } finally {
            session.endSession();
        }
        return response;
    }
}
