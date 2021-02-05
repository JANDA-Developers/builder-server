import { Field, InputType, Int, ObjectType } from "type-graphql";
import { CountryCode } from "./CountryCode.enum";
import {
    Contact,
    DomainRegistrationParam,
    Extra,
} from "./DomainRetistration.interface";

@ObjectType()
@InputType("ContactTypeInput")
export class ContactType implements Contact {
    @Field(() => String, { nullable: true })
    AddressLine1?: string;

    @Field(() => String, { nullable: true })
    AddressLine2?: string;

    @Field(() => String, { nullable: true })
    City?: string;

    @Field(() => String, { nullable: true })
    ContactType?: string;

    @Field(() => CountryCode, { nullable: true })
    CountryCode?: CountryCode;

    @Field(() => String, { nullable: true })
    Email?: string;

    @Field(() => [ExtraType], { nullable: true })
    ExtraParams?: ExtraType[];

    @Field(() => String, { nullable: true })
    Fax?: string;

    @Field(() => String, { nullable: true })
    FirstName?: string;

    @Field(() => String, { nullable: true })
    LastName?: string;

    @Field(() => String, { nullable: true })
    OrganizationName?: string;

    @Field(() => String, { nullable: true })
    PhoneNumber?: string;

    @Field(() => String, { nullable: true })
    State?: string;

    @Field(() => String, { nullable: true })
    ZipCode?: string;
}

@ObjectType()
@InputType("ExtraTypeInput")
export class ExtraType implements Extra {
    @Field(() => String)
    Name: string;

    @Field(() => String)
    Value: string;
}

@ObjectType()
@InputType("DomainRegistrationTypeInput")
export class DomainRegistrationType implements DomainRegistrationParam {
    @Field(() => String)
    DomainName: string;

    @Field(() => ContactType)
    AdminContact: ContactType;

    @Field(() => ContactType)
    RegistrantContact: ContactType;

    @Field(() => ContactType)
    TechContact: ContactType;

    @Field(() => Boolean, { defaultValue: true })
    AutoRenew: boolean;

    @Field(() => Int, { defaultValue: 1 })
    DurationInYears: number;

    @Field(() => String, { nullable: true })
    IdnLangCode: string;

    @Field(() => Boolean, { defaultValue: true })
    PrivacyProtectAdminContact: boolean;

    @Field(() => Boolean, { defaultValue: true })
    PrivacyProtectRegistrantContact: boolean;

    @Field(() => Boolean, { defaultValue: true })
    PrivacyProtectTechContact: boolean;
}
