import { useSearch } from '@core/urql/hooks';
import { graphql as gql } from '@core/api/gql';
import { SearchGroupsDocument } from '@core/api/graphql';

export const searchGroups = gql(`
  query SearchGroups($after: String, $first: Int!, $query: String!) {
    search: groups(after: $after, first: $first, filters: { search: $query }) {
      edges {
        node {
          id
          name
          userCanManage
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export default function useGroupSearch(options: any) {
  return useSearch(SearchGroupsDocument, options);
}
