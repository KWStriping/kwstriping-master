import type stateNames from '@data/stateNames.json';
import type { CountryCode } from '@core/api';

export type StateCode = keyof typeof stateNames;

export type AddressField =
  | 'city'
  | 'firstName'
  | 'lastName'
  | 'companyName'
  | 'countryArea'
  | 'cityArea'
  | 'postalCode'
  | 'countryCode'
  | 'companyName'
  | 'streetAddress1'
  | 'streetAddress2'
  | 'phone';

export type ApiAddressField = AddressField | 'name';

export interface AddressFormData {
  id?: string;
  firstName?: Maybe<string>;
  lastName?: Maybe<string>;
  companyName?: string;
  phone?: Maybe<string>;
  streetAddress1: string;
  streetAddress2?: Maybe<string>;
  city: string;
  cityArea?: Maybe<string>;
  state?: Maybe<string>;
  countryArea?: Maybe<string>;
  countryCode: CountryCode;
  postalCode: string;
}

export interface OmissibleAddressData {
  id?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  cityArea?: string;
  phone?: string;
  state?: string;
}
