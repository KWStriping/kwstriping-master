import { useSearch } from '@core/urql/hooks';
import { graphql as gql } from '@core/api/gql';

import { SearchPageKlassesDocument } from '@core/api/graphql';

export const searchPageKlasses = gql(`
  query SearchPageKlasses($after: String, $first: Int!, $query: String!) {
    search: pageKlasses(after: $after, first: $first, filters: { search: $query }) {
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

export default function usePageKlassSearch(options: any) {
  return useSearch(SearchPageKlassesDocument, options);
}
