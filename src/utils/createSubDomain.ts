import aws, { AWSError, Route53 } from "aws-sdk";

const route53 = new aws.Route53();

export const createJandaSubDomain = async (
    domain: string,
    callBack: (
        err: AWSError,
        data: Route53.Types.ChangeResourceRecordSetsResponse
    ) => void
) => {
    const name = domain.replace(".stayjanda.cloud", "");
    const result = await route53
        .changeResourceRecordSets(
            {
                HostedZoneId: "Z3IBOKGLICR3LI",
                ChangeBatch: {
                    Changes: [
                        {
                            Action: "CREATE",
                            ResourceRecordSet: {
                                AliasTarget: {
                                    DNSName: "jungle.stayjanda.cloud",
                                    EvaluateTargetHealth: false,
                                    HostedZoneId: "Z3IBOKGLICR3LI",
                                },
                                Name: `${name}.stayjanda.cloud`,
                                Type: "CNAME",
                            },
                        },
                    ],
                },
            },
            callBack
        )
        .promise();

    return result;
};
