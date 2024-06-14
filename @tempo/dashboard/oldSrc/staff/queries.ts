import { gql } from '@tempo/api';

export const staffList = gql(`
  query StaffList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: StaffUserFilter
    $sort: UserOrderingInput
  ) {
    staffUsers(
      before: $before
      after: $after
      first: $first
      last: $last
      filters: $filter
      sortBy: $sort
    ) {
      edges {
        cursor
        node {
          ...StaffMember
          avatar(size: 48) {
            url
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`);

export const staffMemberDetails = gql(`
  query StaffMemberDetails($id: ID!) {
    user(id: $id) {
      ...StaffMemberDetails
    }
  }
`);
