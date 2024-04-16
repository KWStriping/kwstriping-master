import { graphql as gql } from '@core/api/gql';

export const createMedia = gql(`
  mutation MediaCreate($input: MediaCreationInput!) {
    createMedia(data: $input) {
      errors {
        ...Error
      }
      result {
        id
      }
    }
  }
`);

export const updateMedia = gql(`
  mutation MediaUpdate($id: ID!, $input: MediaInput!) {
    updateMedia(id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        ...MediaItemDetails
      }
    }
  }
`);

export const mediaRemove = gql(`
  mutation MediaRemove($id: ID!) {
    deleteMediaItem(id: $id) {
      errors {
        ...Error
      }
    }
  }
`);

export const publishMediaItems = gql(`
  mutation MediaBulkPublish($ids: [ID!]!, $isPublished: Boolean!) {
    publishMediaItems(ids: $ids, isPublished: $isPublished) {
      errors {
        ...Error
      }
    }
  }
`);

export const mediaBulkRemove = gql(`
  mutation MediaBulkRemove($ids: [ID!]!) {
    deleteMediaItems(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);
