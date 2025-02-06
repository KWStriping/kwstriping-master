import { gql } from '@tempo/api';

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
