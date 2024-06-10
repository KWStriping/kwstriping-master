import { gql } from '@tempo/api/gql';

export const pageKlassListQuery = gql(`
  query PageKlassList(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: PageKlassFilter
    $sort: PageKlassOrderingInput
  ) {
    pageKlasses(
      after: $after
      before: $before
      first: $first
      last: $last
      filters: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...PageKlass
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const pageKlassesDetailsQuery = gql(`
  query PageKlassDetails($id: ID!) {
    pageKlass(id: $id) {
      ...PageKlassDetails
    }
  }
`);
