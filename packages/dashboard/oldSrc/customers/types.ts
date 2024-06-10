import type { CountryCode } from '@core/api/graphql';

export interface AddressTypeInput {
  city: string;
  cityArea?: string;
  companyName?: string;
  countryCode: CountryCode;
  countryArea?: string;
  firstName?: string;
  lastName?: string;
  phone: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2?: string;
}

export interface AddressType {
  id: string;
  city: string;
  cityArea?: string;
  companyName?: string;
  country: {
    code: string;
    name: string;
  };
  countryArea?: string;
  firstName: string;
  lastName: string;
  phone?: Maybe<string>;
  postalCode: string;
  streetAddress1: string;
  streetAddress2?: string;
}
