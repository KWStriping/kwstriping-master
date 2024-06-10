import { useSearch } from '@core/urql/hooks';
import { graphql as gql } from '@core/api/gql';
import { SearchPagesDocument } from '@core/api/graphql';

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
