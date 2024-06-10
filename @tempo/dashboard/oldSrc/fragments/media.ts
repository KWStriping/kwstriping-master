import { gql } from '@tempo/api/gql';

export const mediaFragment = gql(`
  fragment MediaItem on MediaItem {
    id
    title
    alt
    # sortOrder
    file {
      url
    }
    placeholder
    isPublished
    type
  }
`);

export const mediaItemDetailsFragment = gql(`
  fragment MediaItemDetails on MediaItem {
    ...MediaItem
    ...Metadata
    file {
      __typename
      url
      contentType
    }
    description
    publishedAt
  }
`);
