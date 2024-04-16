import { graphql as gql } from '@core/api/gql';

export const groupListQuery = gql(`
  query GroupList(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: GroupFilter
    $sort: GroupOrderingInput
  ) {
    groups(
      after: $after
      before: $before
      first: $first
      last: $last
      filters: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...Group
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const groupDetailsQuery = gql(`
  query GroupDetails($id: ID!, $userId: ID!) {
    group(id: $id) {
      ...GroupDetails
    }
    user(id: $userId) {
      editableGroups {
        id
      }
      userPermissions {
        code
        sourceGroups(userId: $userId) {
          id
        }
      }
    }
  }
`);
