import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { Context } from "../../types/types";
import { Lambda } from "aws-sdk";
import { DomainRegistrationType } from "./shared/DomainRetistration.type";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import { UserError } from "../Error/shared/Error.type";
import { DomainOperationOutput } from "./shared/DomainOperationOutput.type";

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
    @Mutation(() => DomainRegistrationResponse)
    async DomainRegistration(
        @Ctx() context: Context,
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
            }
            response.setData(result.data);
        } catch (error) {
            response.setError(new UserError(error.message, error.code));
        }
        return response;
    }
}
