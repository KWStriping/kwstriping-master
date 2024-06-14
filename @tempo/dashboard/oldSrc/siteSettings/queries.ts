import { gql } from '@tempo/api';

export const siteSettings = gql(`
  query SiteSettings {
    shop {
      ...Shop
    }
  }
`);
