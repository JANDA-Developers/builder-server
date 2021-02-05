import { Resolver, Mutation, Arg, Field, Ctx, ObjectType } from "type-graphql";
import { Context } from "../../types/types";
import { Lambda } from "aws-sdk";
import { DomainRegistrationType } from "./shared/DomainRetistration.type";

@ObjectType()
export class DomainRegistrationOutput {
    @Field(() => Boolean)
    ok: boolean;

    @Field(() => String, { nullable: true })
    error: string;

    @Field(() => String, { nullable: true })
    OperationId: string;
}

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
    @Mutation(() => DomainRegistrationOutput)
    async DomainRegistration(
        @Ctx() context: Context,
        @Arg("input", () => DomainRegistrationType)
        input: DomainRegistrationType
    ): Promise<DomainRegistrationOutput> {
        const response: DomainRegistrationOutput = Object.assign(
            new DomainRegistrationOutput(),
            {
                ok: true,
                error: null,
                OperationId: null,
            }
        );
        try {
            // TODO: 렛츠고 ㅎㅎ
            const result = await DomainRegistrationOrError(input);
            if (typeof result === "string") {
                response.OperationId = JSON.stringify(result);
            }
        } catch (error) {
            response.error = error.message;
            response.ok = false;
        }
        return response;
    }
}
