import { useSearch } from '@tempo/api/hooks';
import { gql } from '@tempo/api';
import { SearchPagesDocument } from '@tempo/api/generated/graphql';

export const searchPages = gql(`
  query SearchPages($after: String, $first: Int!, $query: String!) {
    search: pages(after: $after, first: $first, filters: { search: $query }) {
      edges {
        node {
          id
          title
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export default function usePageSearch(options: any) {
  return useSearch(SearchPagesDocument, options);
}
