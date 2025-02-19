import { useSearch } from '@tempo/api/hooks';
import { gql } from '@tempo/api/gql';
import { SearchGroupsDocument } from '@tempo/api/generated/graphql';

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
