import { mongoose } from "@typegoose/typegoose";
import {
    Resolver,
    Mutation,
    Field,
    Arg,
    Authorized,
    InputType,
    Ctx,
} from "type-graphql";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import { errorGenForUnexist, validateClass } from "../../helpers/errorHandling";
import { User, UserModel, UserRole } from "../../models/User/User.model";
import { ALLOW_MEMBER } from "../../types/const";

const UserUpdateResponse = GenerateResponse(User, "UserUpdate");
type UserUpdateResponse = InstanceType<typeof UserUpdateResponse>;
@InputType()
export class UserUpdateInput {
    @Field(() => String, { nullable: true })
    name: string;

    @Field(() => String, { nullable: true })
    email: string;

    @Field(() => String, { nullable: true })
    phoneNumber: string;

    @Field(() => String, { nullable: true })
    company?: string;

    @Field(() => Number, { nullable: true })
    pageLimit?: number;
}

@Resolver()
export class UserUpdateResolver {
    @Authorized(ALLOW_MEMBER)
    @Mutation(() => UserUpdateResponse)
    async UserUpdate(
        @Ctx("user") { _id, role }: User,
        @Arg("input") input: UserUpdateInput,
        @Arg("id", { nullable: true }) id?: string
    ): Promise<UserUpdateResponse> {
        const response = new UserUpdateResponse();
        const session = await mongoose.startSession();
        session.startTransaction();

        if (role !== UserRole.ADMIN && id) {
            throw Error("Permission Deny");
        }

        try {
            const User = await UserModel.findById(id || _id);
            if (!User) {
                throw errorGenForUnexist("User");
            }
            for (const field in input) {
                if (Object.prototype.hasOwnProperty.call(input, field)) {
                    User[field] = input[field];
                }
            }
            await validateClass(User);
            await User.save({ session });
            response.setData(User);
            await session.commitTransaction();
        } catch (error) {
            response.setError(error);
        }
        return response;
    }
}
