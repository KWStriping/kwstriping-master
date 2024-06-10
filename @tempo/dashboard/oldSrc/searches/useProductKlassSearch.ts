import { useSearch } from '@tempo/api/hooks';
import { gql } from '@tempo/api/gql';

import { SearchProductKlassesDocument } from '@tempo/api/generated/graphql';

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
