import { useSearch } from '@core/urql/hooks';
import { graphql as gql } from '@core/api/gql';

import { SearchCollectionsDocument } from '@core/api/graphql';

export const searchCollections = gql(`
  query SearchCollections($after: String, $first: Int!, $query: String!) {
    search: collections(after: $after, first: $first, filters: { search: $query }) {
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

export default function useCollectionSearch(options: any) {
  return useSearch(SearchCollectionsDocument, options);
}
