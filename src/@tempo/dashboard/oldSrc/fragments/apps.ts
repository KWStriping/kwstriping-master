import { gql } from '@tempo/api/gql';

export const appFragment = gql(`
  fragment App on App {
    id
    name
    createdAt
    isActive
    type
    homepageUrl
    appUrl
    manifestUrl
    configurationUrl
    supportUrl
    version
    accessToken
    privateMetadata {
      key
      value
    }
    metadata {
      key
      value
    }
    tokens {
      authToken
      id
      name
    }
    webhooks {
      ...Webhook
    }
  }
`);

export const appListItemFragment = gql(`
  fragment AppListItem on App {
    id
    name
    isActive
    type
    appUrl
    manifestUrl
    permissions {
      ...AppPermission
    }
  }
`);

export const appPermissionFragment = gql(`
  fragment AppPermission on Permission {
    name
    code
  }
`);
