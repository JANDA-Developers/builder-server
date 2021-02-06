import { Resolver, Mutation, Arg, InputType, Field, Ctx } from "type-graphql";
import { ContactInfo } from "./shared/ContactDetail.type";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import { DomainOperationOutput } from "./shared/DomainOperationOutput.type";
import { UserError } from "../Error/shared/Error.type";
import { Lambda } from "aws-sdk";
import { Context } from "../../types/types";

const DomainContactUpdateResponse = GenerateResponse(
    DomainOperationOutput,
    "DomainContactUpdate"
);
type DomainContactUpdateResponse = InstanceType<
    typeof DomainContactUpdateResponse
>;

@InputType()
export class DomainContactUpdateInput {
    @Field(() => String)
    domainName: string;

    @Field(() => ContactInfo, { nullable: true })
    adminContact?: ContactInfo;

    @Field(() => ContactInfo, { nullable: true })
    registrantContact?: ContactInfo;

    @Field(() => ContactInfo, { nullable: true })
    techContact?: ContactInfo;
}

export const DomainContactUpdateOrError = async (
    input: DomainContactUpdateInput
) => {
    const invokeResult = await new Lambda({
        region: "us-east-1",
    })
        .invoke({
            FunctionName:
                "arn:aws:lambda:us-east-1:068549478648:function:domain-contact-update",
            Payload: JSON.stringify(input),
        })
        .promise();
    return invokeResult.Payload;
};

@Resolver()
export class DomainContactUpdateResolver {
    @Mutation(() => DomainContactUpdateResponse)
    async DomainContactUpdate(
        @Ctx() context: Context,
        @Arg("input", () => DomainContactUpdateInput)
        input: DomainContactUpdateInput
    ): Promise<DomainContactUpdateResponse> {
        const response = new DomainContactUpdateResponse();
        try {
            const result = JSON.parse(
                (await DomainContactUpdateOrError(input)) as string
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
