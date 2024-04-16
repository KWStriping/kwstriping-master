import { useSearch } from '@core/urql/hooks';
import { graphql as gql } from '@core/api/gql';
import { SearchMediaDocument } from '@core/api/graphql';

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
