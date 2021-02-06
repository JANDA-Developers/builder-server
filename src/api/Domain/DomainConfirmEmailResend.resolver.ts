import { Lambda } from "aws-sdk";
import { Resolver, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { GenerateResponse } from "../../helpers/BaseResponse.type";

@ObjectType()
export class DomainConfirmEmailResendOutput {
    @Field(() => String)
    domainName: string;

    @Field(() => String, { nullable: true })
    emailAddress?: string;

    @Field(() => Boolean, { nullable: true })
    isAlreadyVerified?: boolean;
}

const DomainConfirmEmailResendResponse = GenerateResponse(
    DomainConfirmEmailResendOutput,
    "DomainConfirmEmailResend"
);

type DomainConfirmEmailResendResponse = InstanceType<
    typeof DomainConfirmEmailResendResponse
>;

export const DomainConfirmEmailResendResendOrError = async (
    domainName: string
): Promise<DomainConfirmEmailResendOutput | undefined> => {
    const invokeResult = await new Lambda({ region: "us-east-1" })
        .invoke({
            FunctionName:
                "arn:aws:lambda:us-east-1:068549478648:function:domain-confirm-email-resend",
            Payload: JSON.stringify({ domainName }),
        })
        .promise();
    return typeof invokeResult.Payload === "string"
        ? JSON.parse(invokeResult.Payload)
        : undefined;
};

@Resolver()
export class DomainConfirmEmailResendResolver {
    @Mutation(() => DomainConfirmEmailResendResponse)
    async DomainConfirmEmailResend(
        @Arg("domainName", () => String)
        domainName: string
    ): Promise<DomainConfirmEmailResendResponse | undefined> {
        const response = new DomainConfirmEmailResendResponse();
        try {
            const result = await DomainConfirmEmailResendResendOrError(
                domainName
            );
            response.setData(result || null);
        } catch (error) {
            console.log(error);
            response.setError(error);
        }
        return response;
    }
}
