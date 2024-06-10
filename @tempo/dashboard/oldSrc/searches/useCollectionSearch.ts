import { useSearch } from '@tempo/api/hooks';
import { gql } from '@tempo/api/gql';

import { SearchCollectionsDocument } from '@tempo/api/generated/graphql';

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
