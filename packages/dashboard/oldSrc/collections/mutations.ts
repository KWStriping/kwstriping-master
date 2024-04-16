import { graphql as gql } from '@core/api/gql';

export const updateCollection = gql(`
  mutation CollectionUpdate($id: ID!, $input: CollectionInput!) {
    updateCollection(id: $id, data: $input) {
      result {
        ...CollectionDetails
      }
      errors {
        ...Error
      }
    }
  }
`);

export const assignCollectionProduct = gql(`
  mutation CollectionAssignProduct(
    $collectionId: ID!
    $productIds: [ID!]!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    addProductsToCollection(collectionId: $collectionId, products: $productIds) {
      result {
        id
        products(first: $first, after: $after, before: $before, last: $last) {
          edges {
            node {
              ...CollectionProduct
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
      errors {
        ...Error
      }
    }
  }
`);

export const createCollection = gql(`
  mutation CreateCollection($input: CollectionCreationInput!) {
    createCollection(data: $input) {
      result {
        ...CollectionDetails
      }
      errors {
        ...Error
      }
    }
  }
`);

export const removeCollection = gql(`
  mutation RemoveCollection($id: ID!) {
    deleteCollection(id: $id) {
      errors {
        ...Error
      }
    }
  }
`);

export const unassignCollectionProduct = gql(`
  mutation UnassignCollectionProduct(
    $collectionId: ID!
    $productIds: [ID!]!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    removeProductsFromCollection(collectionId: $collectionId, products: $productIds) {
      result {
        id
        products(first: $first, after: $after, before: $before, last: $last) {
          edges {
            node {
              id
              name
              productKlass {
                id
                name
              }
              thumbnail {
                url
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
      errors {
        ...Error
      }
    }
  }
`);

export const deleteCollections = gql(`
  mutation CollectionBulkDelete($ids: [ID!]!) {
    deleteCollections(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);

export const updateCollectionChannelListing = gql(`
  mutation CollectionChannelListingUpdate(
    $id: ID!
    $input: CollectionChannelListingUpdateInput!
  ) {
    updateCollectionChannelListing(id: $id, data: $input) {
      errors {
        ...CollectionChannelListingError
      }
    }
  }
`);
