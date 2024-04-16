import { graphql as gql } from '@core/api/gql';

export const staffMemberFragment = gql(`
  fragment StaffMember on User {
    id
    email
    firstName
    isActive
    lastName
  }
`);
export const staffMemberDetailsFragment = gql(`
  fragment StaffMemberDetails on User {
    ...StaffMember
    groups {
      id
      name
      userCanManage
    }
    userPermissions {
      code
      name
    }
    avatar(size: 120) {
      url
    }
  }
`);
