import { graphql as gql } from '@core/api/gql';

export const createPage = gql(`
  mutation PageCreate($input: PageCreationInput!) {
    createPage(data: $input) {
      errors {
        ...PageErrorWithAttributes
      }
      result {
        id
      }
    }
  }
`);

export const updatePage = gql(`
  mutation PageUpdate(
    $id: ID!
    $input: PageInput!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    updatePage(id: $id, data: $input) {
      errors {
        ...PageErrorWithAttributes
      }
      result {
        ...PageDetails
      }
    }
  }
`);

export const pageRemove = gql(`
  mutation PageRemove($id: ID!) {
    deletePage(id: $id) {
      errors {
        ...Error
      }
    }
  }
`);

export const publishPages = gql(`
  mutation PageBulkPublish($ids: [ID!]!, $isPublished: Boolean!) {
    publishPages(ids: $ids, isPublished: $isPublished) {
      errors {
        ...Error
      }
    }
  }
`);

export const pageBulkRemove = gql(`
  mutation PageBulkRemove($ids: [ID!]!) {
    deletePages(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);
