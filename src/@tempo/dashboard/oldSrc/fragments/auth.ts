import { gql } from '@tempo/api/gql';

export const userUserPermissionFragment = gql(`
  fragment UserPermission on UserPermission {
    code
    name
  }
`);

export const fragmentUser = gql(`
  fragment User on User {
    id
    email
    firstName
    lastName
    isStaff
    userPermissions {
      ...UserPermission
    }
    avatar {
      url
    }
  }
`);

// export const fragmentUserBase = gql(`
//   fragment UserBase on User {
//     id
//     firstName
//     lastName
//   }
// `);
