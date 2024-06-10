import { gql } from '@tempo/api/gql';

export const siteSettings = gql(`
  query SiteSettings {
    shop {
      ...Shop
    }
  }
`);
