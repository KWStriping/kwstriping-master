import type {
  TaxClassFragment,
  TaxConfigurationFragment,
  TaxCountryConfigurationFragment,
} from '@tempo/api/generated/graphql';
import { TaxCalculationStrategy } from '@tempo/api/generated/constants';

export const taxConfigurations: TaxConfigurationFragment[] = [
  {
    __typename: 'TaxConfiguration',
    id: 'taxConf1',
    channel: {
      __typename: 'Channel',
      id: 'taxChannel1',
      name: 'Channel USD',
    },
    displayGrossPrices: true,
    pricesEnteredWithTax: false,
    chargeTaxes: true,
    taxCalculationStrategy: TaxCalculationStrategy.FlatRates,
    countries: [
      {
        __typename: 'TaxConfigurationPerCountry',
        country: {
          __typename: 'Country',
          code: 'AF',
          country: 'Afghanistan',
        },
        chargeTaxes: false,
        taxCalculationStrategy: null,
        displayGrossPrices: false,
      },
      {
        __typename: 'TaxConfigurationPerCountry',
        country: {
          __typename: 'Country',
          code: 'AX',
          country: 'Åland Islands',
        },
        chargeTaxes: true,
        taxCalculationStrategy: TaxCalculationStrategy.TaxApp,
        displayGrossPrices: true,
      },
    ],
  },
  {
    __typename: 'TaxConfiguration',
    id: 'taxConf2',
    channel: {
      __typename: 'Channel',
      id: 'taxChannel2',
      name: 'Channel PLN',
    },
    displayGrossPrices: false,
    pricesEnteredWithTax: true,
    chargeTaxes: true,
    taxCalculationStrategy: TaxCalculationStrategy.TaxApp,
    countries: [
      {
        __typename: 'TaxConfigurationPerCountry',
        country: {
          __typename: 'Country',
          code: 'AL',
          country: 'Albania',
        },
        chargeTaxes: true,
        taxCalculationStrategy: TaxCalculationStrategy.FlatRates,
        displayGrossPrices: true,
      },
      {
        __typename: 'TaxConfigurationPerCountry',
        country: {
          __typename: 'Country',
          code: 'DZ',
          country: 'Algeria',
        },
        chargeTaxes: false,
        taxCalculationStrategy: null,
        displayGrossPrices: false,
      },
    ],
  },
];

export const taxCountryConfigurations: TaxCountryConfigurationFragment[] = [
  {
    __typename: 'TaxCountryConfiguration',
    country: {
      __typename: 'Country',
      code: 'AF',
      country: 'Afghanistan',
    },
    taxClassCountryRates: [
      {
        __typename: 'TaxClassCountryRate',
        rate: 0.31,
        taxClass: {
          __typename: 'TaxClass',
          id: 'taxCountryConfigurations.0.taxClassCountryRates.0.taxClass.id',
          name: 'Default tax class',
        },
      },
      {
        __typename: 'TaxClassCountryRate',
        rate: 0.05,
        taxClass: {
          __typename: 'TaxClass',
          id: 'taxCountryConfigurations.0.taxClassCountryRates.0.taxClass.id',
          name: 'Perfume',
        },
      },
    ],
  },
  {
    __typename: 'TaxCountryConfiguration',
    country: {
      __typename: 'Country',
      code: 'AX',
      country: 'Åland Islands',
    },
    taxClassCountryRates: [
      {
        __typename: 'TaxClassCountryRate',
        rate: 0.21,
        taxClass: {
          __typename: 'TaxClass',
          id: 'taxCountryConfigurations.0.taxClassCountryRates.0.taxClass.id',
          name: 'Default tax class',
        },
      },
      {
        __typename: 'TaxClassCountryRate',
        rate: 0.05,
        taxClass: {
          __typename: 'TaxClass',
          id: 'taxCountryConfigurations.0.taxClassCountryRates.0.taxClass.id',
          name: 'Food',
        },
      },
    ],
  },
];

export const taxClasses: TaxClassFragment[] = [
  {
    __typename: 'TaxClass',
    id: 'taxClassNode1',
    name: 'Default tax class',
    countries: [
      {
        __typename: 'TaxClassCountryRate',
        country: {
          __typename: 'Country',
          code: 'AX',
          country: 'Åland Islands',
        },
        rate: 0.2,
      },
      {
        __typename: 'TaxClassCountryRate',
        country: {
          __typename: 'Country',
          code: 'AF',
          country: 'Afghanistan',
        },
        rate: 0.15,
      },
    ],
    metadata: [],
    privateMetadata: [],
  },
  {
    __typename: 'TaxClass',
    id: 'taxClassesNode2',
    name: 'Food',
    countries: [
      {
        __typename: 'TaxClassCountryRate',
        country: {
          __typename: 'Country',
          code: 'AX',
          country: 'Åland Islands',
        },
        rate: 0.05,
      },
      {
        __typename: 'TaxClassCountryRate',
        country: {
          __typename: 'Country',
          code: 'AF',
          country: 'Afghanistan',
        },
        rate: 0.0,
      },
    ],
    metadata: [],
    privateMetadata: [],
  },
];
