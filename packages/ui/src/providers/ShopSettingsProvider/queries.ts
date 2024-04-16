import { graphql as gql } from '@core/api/gql';

export const shopInfo = gql(`
  query ShopInfo {
    shop {
      id
      ...ShopSettings
      permissions {
        code
        name
      }
    }
  }
`);

export const shopCountries = gql(`
  query ShopCountries($filter: CountryFilter) {
    shop {
      id
      countries(filters: $filter) {
        code
        name
      }
    }
  }
`);
