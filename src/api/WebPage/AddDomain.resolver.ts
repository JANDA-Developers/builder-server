import {
    Resolver,
    Mutation,
    Field,
    Ctx,
    Arg,
    InputType,
    Authorized,
} from "type-graphql";
import { GenerateResponse } from "../../helpers/BaseResponse.type";
import { WebPage, WebPageModel } from "../../models/WebPage/WebPage.model";
import { mongoose } from "@typegoose/typegoose";
import { Context } from "../../types/types";
import { errorGenForUnexist } from "../../helpers/errorHandling";
import { ObjectId } from "mongodb";
import { ALLOW_ALL } from "../../types/const";
import { createJandaSubDomain } from "../../utils/createSubDomain";
import { DomainModel } from "../../models/Domain/Domain.model";
import { HostedZoneChangeRecordSets } from "../../utils/domain/recordSetFunctions";

const AddDomainResponse = GenerateResponse(WebPage, "AddDomain");
type AddDomainResponse = InstanceType<typeof AddDomainResponse>;

@InputType()
export class AddDomainInput {
    @Field({ nullable: true })
    public domain: string;
}

@Resolver()
export class AddDomainResolver {
    @Authorized(ALLOW_ALL)
    @Mutation(() => AddDomainResponse)
    async AddDomain(
        @Ctx() context: Context,
        @Arg("id", () => ObjectId) WebPageId: ObjectId,
        @Arg("domain") domain: string,
        @Arg("domainId", { nullable: true }) domainId: string,
        @Arg("isSubDomain", () => Boolean, { nullable: true })
        isSubDomain: boolean
    ): Promise<AddDomainResponse> {
        const response = new AddDomainResponse();
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const user = context.user;
            if (!user) {
                throw errorGenForUnexist("User");
            }
            const WebPage = await WebPageModel.findById(WebPageId);
            if (!WebPage) {
                throw errorGenForUnexist("WebPage");
            }

            if (domainId) {
                const domain = await DomainModel.findById(domainId);
                if (!domain) throw errorGenForUnexist("Domain");
                WebPage.domain = domain.Name;
                WebPage.domainId = domain._id;
                await HostedZoneChangeRecordSets(domain.Name, {
                    action: "CREATE",
                    hostedZoneId: domain.Id,
                    recordSetType: isSubDomain ? "CNAME" : "A",
                });
            } else {
                const result = await createJandaSubDomain(domain, (err) => {
                    if (err) console.error(err, err.stack);
                });

                if (!result.ChangeInfo.Status /*실패이면*/) {
                    throw Error(JSON.stringify(result));
                }
                WebPage.domain = domain;
            }
            await WebPage.save({ session });
            response.setData(WebPage);
            await session.commitTransaction();
        } catch (error) {
            response.setError(error);
            await session.abortTransaction();
        } finally {
            session.endSession();
        }
        return response;
    }
}
