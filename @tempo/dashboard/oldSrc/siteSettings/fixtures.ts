import type { SiteSettingsQuery } from '@tempo/api/generated/graphql';

export const shop: SiteSettingsQuery['shop'] = {
  __typename: 'Shop',
  companyAddress: {
    __typename: 'Address',
    city: 'Kenstad',
    cityArea: 'Alabama',
    companyName: 'Tempo e-commerce',
    country: {
      __typename: 'Country',
      code: 'UA',
      country: 'United Arab Emirates',
    },
    countryArea: '',
    firstName: '',
    id: '1',
    lastName: '',
    phone: '+41 876-373-9137',
    postalCode: '89880-6342',
    streetAddress1: '01419 Bernhard Plain',
    streetAddress2: 's',
  },
  countries: [
    {
      __typename: 'Country',
      code: 'UA',
      country: 'United Arab Emirates',
    },
  ],
  customerSetPasswordUrl: 'https://example.com/reset-password',
  defaultMailSenderAddress: 'noreply@example.com',
  defaultMailSenderName: 'Tempo',
  description: 'Lorem ipsum dolor sit amet',
  domain: {
    __typename: 'Domain',
    host: 'localhost:8000',
  },
  name: 'Tempo e-commerce',
  reserveStockDurationAnonymousUser: 10,
  reserveStockDurationAuthenticatedUser: 10,
  maxItemCountPerCheckout: 50,
};
