import { Lambda } from "aws-sdk";
import { Resolver, Query, Arg, Field, Ctx, ObjectType } from "type-graphql";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import { Context } from "../../types/types";
import { UserError } from "../Error/shared/Error.type";
import { ContactInfo } from "./shared/ContactDetail.type";

@ObjectType()
export class DomainDetailsOutput {
    @Field(() => String)
    DomainName: string;

    @Field(() => [Nameserver])
    Nameservers: Nameserver[];

    @Field(() => String)
    AutoRenew: boolean;

    @Field(() => ContactInfo)
    AdminContact: ContactInfo;

    @Field(() => ContactInfo)
    RegistrantContact: ContactInfo;

    @Field(() => ContactInfo)
    TechContact: ContactInfo;

    @Field(() => Boolean)
    AdminPrivacy: boolean;

    @Field(() => Boolean)
    RegistrantPrivacy: boolean;

    @Field(() => Boolean)
    TechPrivacy: boolean;

    @Field(() => String)
    RegistrarName: string;

    @Field(() => String)
    WhoIsServer: string;

    @Field(() => String)
    RegistrarUrl: string;

    @Field(() => String)
    AbuseContactEmail: string;

    @Field(() => String)
    AbuseContactPhone: string;

    @Field(() => String)
    CreationDate: string;

    @Field(() => String)
    UpdatedDate: string;

    @Field(() => String)
    ExpirationDate: string;

    @Field(() => [String])
    StatusList: string[];
}

@ObjectType()
export class Nameserver {
    @Field(() => String)
    Name: string;

    @Field(() => [String])
    GlueIps: string[];
}

const DomainDetailsResponse = GenerateResponse(
    DomainDetailsOutput,
    "DomainDetails"
);
type DomainDetailsResponse = InstanceType<typeof DomainDetailsResponse>;

export const DomainDetailsInvoke = async (domainName: string) => {
    const response = await new Lambda({ region: "us-east-1" })
        .invoke({
            FunctionName:
                "arn:aws:lambda:us-east-1:068549478648:function:domain-details",
            Payload: JSON.stringify({ domainName }),
        })
        .promise();
    return JSON.parse(response.Payload as string);
};

@Resolver()
export class DomainDetailsResolver {
    @Query(() => DomainDetailsResponse)
    async DomainDetails(
        @Ctx() context: Context,
        @Arg("domainName", () => String) domainName: string
    ): Promise<DomainDetailsResponse> {
        const response = new DomainDetailsResponse();
        try {
            const result = await DomainDetailsInvoke(domainName);
            console.log(result);
            if (!result.ok) {
                throw result.error;
            }
            response.setData(result.data);
        } catch (error) {
            response.ok = false;
            response.error = new UserError(error.message, error.code);
        }
        return response;
    }
}
