import { useSearch } from '@tempo/api/hooks';
import { gql } from '@tempo/api/gql';
import { SearchMediaDocument } from '@tempo/api/generated/graphql';

export const searchMedia = gql(`
  query SearchMedia($after: String, $first: Int!, $query: String!) {
    search: media(after: $after, first: $first, filters: { search: $query }) {
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

export default function useMediaSearch(options: any) {
  return useSearch(SearchMediaDocument, options);
}
