import { CountryCode } from "./CountryCode.enum";

export interface DomainRegistrationParam {
    /**
     * 자동 갱신!
     * default: true
     */
    AutoRenew: boolean;
    DomainName: string;
    /**
     * 1 ~ 10
     * default: 1
     */
    DurationInYears: number;
    IdnLangCode?: string;
    /**
     * Whois에서 쿼리 못하게 막을거?
     * default: true
     */
    PrivacyProtectAdminContact: boolean;
    /**
     * default: true
     */
    PrivacyProtectRegistrantContact: boolean;
    /**
     * default: true
     */
    PrivacyProtectTechContact: boolean;
    AdminContact: Contact;
    RegistrantContact: Contact;
    TechContact: Contact;
}

export interface Contact {
    AddressLine1?: string;
    AddressLine2?: string;
    City?: string;
    ContactType?: string;
    CountryCode?: CountryCode;
    Email?: string;
    ExtraParams?: Extra[];
    Fax?: string;
    FirstName?: string;
    LastName?: string;
    OrganizationName?: string;
    PhoneNumber?: string;
    State?: string;
    ZipCode?: string;
}
export interface Extra {
    Name: string;
    Value: string;
}
