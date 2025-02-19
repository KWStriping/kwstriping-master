import { gql } from '@tempo/api/gql';

export const updateTaxConfiguration = gql(`
  mutation TaxConfigurationUpdate($id: ID!, $input: TaxConfigurationUpdateInput!) {
    updateTaxConfiguration(id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        ...TaxConfiguration
      }
    }
  }
`);

export const updateTaxCountryConfiguration = gql(`
  mutation TaxCountryConfigurationUpdate(
    $countryCode: CountryCode!
    $updateTaxClassRates: [TaxClassRateInput!]!
  ) {
    updateTaxCountryConfiguration(
      countryCode: $countryCode
      updateTaxClassRates: $updateTaxClassRates
    ) {
      errors {
        ...Error
      }
      result {
        ...TaxCountryConfiguration
      }
    }
  }
`);

export const deleteTaxCountryConfiguration = gql(`
  mutation TaxCountryConfigurationDelete($countryCode: CountryCode!) {
    deleteTaxCountryConfiguration(countryCode: $countryCode) {
      errors {
        ...Error
      }
      result {
        ...TaxCountryConfiguration
      }
    }
  }
`);

export const updateTaxClass = gql(`
  mutation TaxClassUpdate($id: ID!, $input: TaxClassUpdateInput!) {
    updateTaxClass(id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        ...TaxClass
      }
    }
  }
`);

export const createTaxClass = gql(`
  mutation TaxClassCreate($input: TaxClassCreationInput!) {
    createTaxClass(data: $input) {
      errors {
        ...Error
      }
      result {
        ...TaxClass
      }
    }
  }
`);

export const deleteTaxClass = gql(`
  mutation TaxClassDelete($id: ID!) {
    deleteTaxClass(id: $id) {
      errors {
        ...Error
      }
    }
  }
`);
