import {
    Resolver,
    Mutation,
    ArgsType,
    Field,
    Arg,
    Authorized,
    ObjectType,
} from "type-graphql";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import { UserModel, UserRole } from "../../models/User/User.model";

@ObjectType()
class ReSigin {
    constructor(message: string) {
        this.message = message;
    }
    @Field()
    message: string;
}

const ReSignResponse = GenerateResponse(ReSigin, "ReSign");
type ReSignResponse = InstanceType<typeof ReSignResponse>;
@ArgsType()
export class ReSignArgs {
    @Field(() => String)
    email: string;
}

@Resolver()
export class ReSignResolver {
    @Authorized(UserRole.ADMIN)
    @Mutation(() => ReSignResponse)
    async ReSign(@Arg("email") email: string): Promise<ReSignResponse> {
        const response = new ReSignResponse();
        try {
            const target = await UserModel.findOne({ email });

            if (!target) {
                throw Error(`대상 ${target}는 존재하지 않습니다.`);
            } else {
                target.deleteOne();
            }

            target.save();
            response.setData(null);
        } catch (error) {
            response.setError(error);
        }
        return response;
    }
}
