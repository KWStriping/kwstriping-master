import { graphql as gql } from '@core/api/gql';

export const siteSettings = gql(`
  query SiteSettings {
    shop {
      ...Shop
    }
  }
`);
