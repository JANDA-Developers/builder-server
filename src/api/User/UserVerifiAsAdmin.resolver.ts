import { Resolver, Mutation, Arg, Authorized, Ctx } from "type-graphql";
import { errorGenForUnexist } from "../../helpers/errorHandling";
import { User, UserModel, UserRole } from "../../models/User/User.model";
import { ObjectId } from "mongodb";
import { WithMongoSession } from "../../helpers/decorators/MongoSession.decorator";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import { handleBusinessError } from "../../helpers/handBusinessError";
import { Context } from "vm";

const UserVerifiAsAdminResponse = GenerateResponse(User, "UserVerifiAsAdmin");
type UserVerifiAsAdminResponse = InstanceType<typeof UserVerifiAsAdminResponse>;

@Resolver()
export class UserVerifiAsAdminResolver {
    @WithMongoSession()
    @Authorized(UserRole.ADMIN)
    @Mutation(() => UserVerifiAsAdminResponse)
    async UserVerifiAsAdmin(
        @Ctx() { session }: Context,
        @Arg("userId") userId: ObjectId
    ) {
        return handleBusinessError(UserVerifiAsAdminResponse, async () => {
            const user = await UserModel.findById(userId);
            if (!user) throw errorGenForUnexist("User");
            user.isVerifiAsAdmin = true;
            await user.save({ session });
            return user;
        });
    }
}
