import { graphql as gql } from '@core/api/gql';

export const metadataFragment = gql(`
  fragment MetadataItem on MetadataItem {
    key
    value
  }
  fragment Metadata on ObjectWithMetadata {
    metadata {
      ...MetadataItem
    }
    privateMetadata {
      ...MetadataItem
    }
  }
`);
