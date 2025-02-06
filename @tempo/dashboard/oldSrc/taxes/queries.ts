import { gql } from '@tempo/api';

export const taxConfigurationsList = gql(`
  query TaxConfigurationsList(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $filter: TaxConfigurationFilter
  ) {
    taxConfigurations(
      before: $before
      after: $after
      first: $first
      last: $last
      filters: $filter
    ) {
      edges {
        node {
          ...TaxConfiguration
        }
      }
    }
  }
`);

export const taxCountriesList = gql(`
  query TaxCountriesList {
    taxCountryConfigurations {
      ...TaxCountryConfiguration
    }
  }
`);

export const taxClassesList = gql(`
  query TaxClassesList(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $filter: TaxClassFilter
    $sortBy: TaxClassOrderingInput
  ) {
    taxClasses(
      before: $before
      after: $after
      first: $first
      last: $last
      filters: $filter
      sortBy: $sortBy
    ) {
      edges {
        node {
          ...TaxClass
        }
      }
    }
  }
`);

export const taxClassAssign = gql(`
  query TaxClassAssign($first: Int, $after: String) {
    taxClasses(first: $first, after: $after) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);
