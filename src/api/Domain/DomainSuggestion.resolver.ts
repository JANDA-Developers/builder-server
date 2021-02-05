import {
    Resolver,
    Query,
    Arg,
    InputType,
    Field,
    Int,
    ObjectType,
    Float,
} from "type-graphql";
import { Lambda } from "aws-sdk";
import { DomainSuggestion as AWSDomainSuggestion } from "aws-sdk/clients/route53domains";
import { tldMap } from "./shared/DomainPriceTable";

@InputType()
export class DomainSuggestionInput {
    @Field(() => String)
    domainName: string;

    @Field(() => Boolean)
    onlyAvailable: boolean;

    @Field(() => Int, { defaultValue: 50 })
    suggestionCount: number;
}

@ObjectType()
export class DomainSuggestion implements AWSDomainSuggestion {
    @Field(() => String, {
        nullable: true,
        description: "AVAILABLE 인 도메인만 등록 가능",
    })
    Availability?: string;

    @Field(() => String)
    DomainName?: string;

    @Field(() => Float)
    PriceRegistration: number;

    @Field(() => Float)
    PriceChangeOwnership: number;

    @Field(() => Float, { nullable: true })
    PriceRestoration: number | null;

    @Field(() => Float, { nullable: true })
    PriceTransfer: number | null;

    @Field(() => String)
    TransferTerm: string;
}

export const getTLD = (domain: string) => {
    return domain.substring(domain.lastIndexOf(".") + 1);
};

@Resolver()
export class DomainSuggestionResolver {
    @Query(() => [DomainSuggestion])
    async DomainSuggestion(
        @Arg("input", () => DomainSuggestionInput) input: DomainSuggestionInput
    ): Promise<DomainSuggestion[] | undefined> {
        try {
            const lambda = new Lambda({
                region: "us-east-1",
            });
            const result = await lambda
                .invoke({
                    FunctionName: "domain-suggestion",
                    Payload: JSON.stringify({
                        domainName: input.domainName,
                        onlyAvailable: input.onlyAvailable,
                        suggestionCount: input.suggestionCount,
                    }),
                })
                .promise();
            if (result.$response.data != null) {
                const data: DomainSuggestion[] = JSON.parse(
                    result.$response.data.Payload as string
                ).map(
                    ({ DomainName, Availability }): DomainSuggestion => {
                        const tld = getTLD(DomainName);
                        const priceTableItem = tldMap.get(tld);
                        const result = Object.assign(new DomainSuggestion(), {
                            DomainName,
                            Availability,
                            ...priceTableItem,
                        } as DomainSuggestion);
                        return result;
                    }
                );
                return data;
            }
        } catch (error) {
            console.log(error);
            return undefined;
        }
        return undefined;
    }
}
