import { useSearch } from '@core/urql/hooks';
import { graphql as gql } from '@core/api/gql';

import { SearchProductKlassesDocument } from '@core/api/graphql';

export const searchProductKlasses = gql(`
  query SearchProductKlasses($after: String, $first: Int!, $query: String!) {
    search: productKlasses(after: $after, first: $first, filters: { search: $query }) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export default function useProductKlassSearch(options: any) {
  return useSearch(SearchProductKlassesDocument, options);
}
