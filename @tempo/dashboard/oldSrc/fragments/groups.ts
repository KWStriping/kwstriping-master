import { gql } from '@tempo/api';

export const groupFragment = gql(`
  fragment Group on Group {
    id
    name
    userCanManage
    users {
      id
      firstName
      lastName
    }
  }
`);

export const permissionFragment = gql(`
  fragment Permission on Permission {
    code
    name
  }
`);

export const groupMember = gql(`
  fragment GroupMember on User {
    ...StaffMember
    avatar(size: 48) {
      url
    }
  }
`);

export const groupDetailsFragment = gql(`
  fragment GroupDetails on Group {
    ...Group
    permissions {
      ...Permission
    }
    users {
      ...GroupMember
    }
  }
`);
