import { useSearch } from '@tempo/api/hooks';
import { gql } from '@tempo/api/gql';

import { SearchPageKlassesDocument } from '@tempo/api/generated/graphql';

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
