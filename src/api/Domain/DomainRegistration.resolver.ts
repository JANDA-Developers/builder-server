import { Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { Context } from "../../types/types";
import { Lambda } from "aws-sdk";
import { ObjectId } from "mongodb";
import { DomainRegistrationType } from "./shared/DomainRetistration.type";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import { UserError } from "../Error/shared/Error.type";
import { DomainOperationOutput } from "./shared/DomainOperationOutput.type";
import { HostedZoneCreate } from "../../utils/domain/recordSetFunctions";
import { Domain, DomainModel } from "../../models/Domain/Domain.model";
import { merge } from "lodash";
import { ALLOW_MEMBER } from "../../types/const";

const DomainRegistrationResponse = GenerateResponse(
    DomainOperationOutput,
    "DomainRegistration"
);
type DomainRegistrationResponse = InstanceType<
    typeof DomainRegistrationResponse
>;

export const DomainRegistrationOrError = async (
    input: DomainRegistrationType
) => {
    const invokeResult = await new Lambda({
        region: "us-east-1",
    })
        .invoke({
            FunctionName:
                "arn:aws:lambda:us-east-1:068549478648:function:domain-registration",
            Payload: JSON.stringify(input),
        })
        .promise();
    return invokeResult.Payload;
};

@Resolver()
export class DomainRegistrationResolver {
    @Authorized(ALLOW_MEMBER)
    @Mutation(() => DomainRegistrationResponse)
    async DomainRegistration(
        @Ctx() { user, session }: Context,
        @Arg("input", () => DomainRegistrationType)
        input: DomainRegistrationType
    ): Promise<DomainRegistrationResponse> {
        const response: DomainRegistrationResponse = new DomainRegistrationResponse();
        try {
            // TODO: 렛츠고 ㅎㅎ
            const result = JSON.parse(
                (await DomainRegistrationOrError(input)) as string
            );
            console.log(result);
            if (!result.ok) {
                throw result.error;
            } else {
                const callerReference = new ObjectId();
                const hostedZoneCreateResult = await HostedZoneCreate({
                    callerReference: callerReference.toHexString(),
                    domainName: input.DomainName,
                });

                const domain = new Domain();
                merge(domain, hostedZoneCreateResult);
                const domainModel = new DomainModel(domain);
                if (!user) throw Error("silly");
                domainModel.ownerId = user._id;
                domainModel.ownerName = user.name;
                await domainModel.save({ session });
                await user.save({ session });
            }
            response.setData(result.data);
        } catch (error) {
            response.setError(new UserError(error.message, error.code));
        }
        return response;
    }
}
