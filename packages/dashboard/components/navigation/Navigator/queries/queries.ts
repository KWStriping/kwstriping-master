import { graphql as gql } from '@core/api/gql';

export const checkIfOrderExists = gql(`
  query CheckIfOrderExists($id: ID!) {
    order(id: $id) {
      id
      status
    }
  }
`);

export const searchCatalog = gql(`
  query SearchCatalog($first: Int!, $query: String!) {
    categories(first: $first, filters: { search: $query }) {
      edges {
        node {
          id
          name
        }
      }
    }

    collections(first: $first, filters: { search: $query }) {
      edges {
        node {
          ...Collection
        }
      }
    }

    products(first: $first, filters: { search: $query }) {
      edges {
        node {
          id
          category {
            id
            name
          }
          name
        }
      }
    }
  }
`);
