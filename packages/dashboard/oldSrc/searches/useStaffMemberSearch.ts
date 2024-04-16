import { useSearch } from '@core/urql/hooks';
import { graphql as gql } from '@core/api/gql';

import { SearchStaffMembersDocument } from '@core/api/graphql';

export const searchStaffMembers = gql(`
  query SearchStaffMembers($after: String, $first: Int!, $query: String!) {
    search: staffUsers(after: $after, first: $first, filters: { search: $query }) {
      edges {
        node {
          id
          email
          firstName
          lastName
          isActive
          avatar {
            alt
            url
          }
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export default function useStaffMemberSearch(options: any) {
  return useSearch(SearchStaffMembersDocument, options);
}
