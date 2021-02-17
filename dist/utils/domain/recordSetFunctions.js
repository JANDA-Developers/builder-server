"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostedZoneCreate = exports.HostedZoneChangeRecordSets = exports.rootDomainName = void 0;
const aws_sdk_1 = require("aws-sdk");
exports.rootDomainName = process.env.ROOT_DOMAIN || "jungle.stayjanda.cloud";
const service = new aws_sdk_1.Route53();
exports.HostedZoneChangeRecordSets = async (domainName, options, comment) => {
    const { action: Action, recordSetType: Type, hostedZoneId: HostedZoneId, } = options;
    const result = await service
        .changeResourceRecordSets({
        HostedZoneId,
        ChangeBatch: {
            Changes: [
                {
                    Action,
                    ResourceRecordSet: {
                        AliasTarget: {
                            DNSName: exports.rootDomainName,
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
exports.HostedZoneCreate = async (input) => {
    const { callerReference: CallerReference, domainName: Name, comment: Comment, } = input;
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
//# sourceMappingURL=recordSetFunctions.js.map