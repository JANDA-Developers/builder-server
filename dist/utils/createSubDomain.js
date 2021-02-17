"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubDomain = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const route53 = new aws_sdk_1.default.Route53();
exports.createSubDomain = async (domain, callBack) => {
    const name = domain.replace(".stayjanda.cloud", "");
    const result = await route53
        .changeResourceRecordSets({
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
    }, callBack)
        .promise();
    return result;
};
//# sourceMappingURL=createSubDomain.js.map