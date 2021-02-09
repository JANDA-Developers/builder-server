import { Resolver, Query, Arg, Field, Ctx, ObjectType } from "type-graphql";
import { Context } from "../../types/types";
import { Lambda } from "aws-sdk";

@ObjectType()
export class DomainContactReachabilityGetResponse {
    @Field(() => String)
    domainName: string;

    @Field(() => String, { nullable: true })
    status?: string;

    @Field(() => String, { nullable: true })
    error?: string;
}

@Resolver()
export class DomainContactReachabilityGetResolver {
    @Query(() => DomainContactReachabilityGetResponse)
    async DomainContactReachabilityGet(
        @Ctx() context: Context,
        @Arg("domainName", () => String)
        domainName: string
    ): Promise<DomainContactReachabilityGetResponse> {
        const result = await new Lambda({ region: "us-east-1" })
            .invoke({
                FunctionName:
                    "arn:aws:lambda:us-east-1:068549478648:function:domain-contact-status",
                Payload: JSON.stringify({ domainName }),
            })
            .promise();
        console.log(result);
        if (result.Payload) {
            return Object.assign(
                new DomainContactReachabilityGetResponse(),
                JSON.parse(result.Payload as string)
            );
        }
        return {
            domainName,
        };
    }
}
