import { useSearch } from '@tempo/api/hooks';
import { gql } from '@tempo/api/gql';

import { SearchStaffMembersDocument } from '@tempo/api/generated/graphql';

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
