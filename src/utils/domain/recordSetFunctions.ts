import { Route53 } from "aws-sdk";
import { ChangeAction, RRType } from "aws-sdk/clients/route53";
import { IHostedZoneCreateInput } from "./hostedzone.type";

export const rootDomainName =
    process.env.ROOT_DOMAIN || "jungle.stayjanda.cloud";
const service = new Route53();

export const HostedZoneChangeRecordSets = async (
    domainName: string,
    options: {
        hostedZoneId: string;
        action: ChangeAction;
        recordSetType: RRType;
    },
    comment?: string
) => {
    const {
        action: Action,
        recordSetType: Type,
        hostedZoneId: HostedZoneId,
    } = options;
    const result = await service
        .changeResourceRecordSets({
            HostedZoneId,
            ChangeBatch: {
                Changes: [
                    {
                        Action,
                        ResourceRecordSet: {
                            AliasTarget: {
                                DNSName: rootDomainName,
                                EvaluateTargetHealth: false,
                                HostedZoneId,
                            },
                            Name: domainName,
                            Type,
                        },
                    },
                ],
                Comment: comment,
            },
        })
        .promise();
    return result.ChangeInfo;
};

/**
 * HostedZone 생성. 도메인을 구매한다고 해서 HostedZone이 동시에 생성되는것 같지는 않다. 결과적으로 수동으로 해야함
 * @param input
 * @returns HostedZone.Id 반드시 저징!
 */
export const HostedZoneCreate = async (input: IHostedZoneCreateInput) => {
    const {
        callerReference: CallerReference,
        domainName: Name,
        comment: Comment,
    } = input;
    const { HostedZone, Location } = await service
        .createHostedZone({
            CallerReference,
            Name,
            HostedZoneConfig: {
                Comment,
            },
        })
        .promise();
    return {
        HostedZone,
        Location,
    };
};
