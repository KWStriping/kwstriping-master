import * as avatarImg from '@tempo/dashboard/assets/images/avatars/avatar1.png';
import { PermissionCode, GroupErrorCode } from '@tempo/api/generated/constants';
import type {
  GroupDetailsFragment,
  GroupErrorFragment,
  GroupFragment,
  SearchStaffMembersQuery,
  StaffMemberDetailsFragment,
} from '@tempo/api/generated/graphql';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';

export const groups: GroupFragment[] = [
  {
    node: {
      id: 'R3JvdXA6Mg==',
      name: 'Customer Support',
      userCanManage: true,
      users: [
        {
          id: 'VXNlcjoyMQ==',
          firstName: '',
          lastName: '',
          __typename: 'User' as const,
        },
      ],
      __typename: 'Group' as const,
    },
    __typename: 'GroupCountableEdge' as const,
  },
  {
    node: {
      id: 'R3JvdXA6MQ==',
      name: 'Full Access',
      userCanManage: false,
      users: [
        {
          id: 'VXNlcjoyMQ==',
          firstName: '',
          lastName: '',
          __typename: 'User' as const,
        },
      ],
      __typename: 'Group' as const,
    },
    __typename: 'GroupCountableEdge' as const,
  },
  {
    node: {
      id: 'R3JvdXA6NA==',
      name: 'Management',
      users: [],
      userCanManage: true,
      __typename: 'Group' as const,
    },
    __typename: 'GroupCountableEdge' as const,
  },
  {
    node: {
      id: 'R3JvdXA6Mw==',
      name: 'Editors',
      userCanManage: true,
      users: [
        {
          id: 'VXNlcjoyMw==',
          firstName: 'Bryan',
          lastName: 'Rodgers',
          __typename: 'User' as const,
        },
        {
          id: 'VXNlcjoyMg==',
          firstName: 'Joshua',
          lastName: 'Mitchell',
          __typename: 'User' as const,
        },
      ],
      __typename: 'Group' as const,
    },
    __typename: 'GroupCountableEdge' as const,
  },
  {
    node: {
      id: 'R3JvdXA6NQ==',
      name: 'Publishers',
      userCanManage: true,
      users: [],
      __typename: 'Group' as const,
    },
    __typename: 'GroupCountableEdge' as const,
  },
].map((edge) => edge.node);

export const userGroups: StaffMemberDetailsFragment['groups'] = [
  {
    id: 'R3JvdXA6MQ==',
    name: 'Full Access',
    userCanManage: false,
    __typename: 'Group',
  },
  {
    id: 'R3JvdXA6Mg==',
    name: 'Customer Support',
    userCanManage: true,
    __typename: 'Group',
  },
];

export const emptyGroup: GroupDetailsFragment = {
  id: 'R3JvdXA6Mw==',
  name: 'Editors',
  userCanManage: true,
  users: [],
  __typename: 'Group',
  permissions: [
    {
      code: PermissionCode.ManagePages,
      name: 'Manage pages.',
      __typename: 'Permission',
    },
  ],
};

export const errorsOfGroupCreate: GroupErrorFragment[] = [
  {
    field: 'name',
    code: GroupErrorCode.Unique,
    message: 'Group name has to be unique',
    __typename: 'GroupError',
  },
  {
    field: 'permissions',
    code: GroupErrorCode.OutOfScopePermission,
    message: 'Permissions out of scope',
    __typename: 'GroupError',
  },
];

export const group: GroupDetailsFragment = {
  id: 'R3JvdXA6Mw==',
  name: 'Editors',
  userCanManage: true,
  users: [
    {
      id: 'VXNlcjoyMg==',
      firstName: 'Joshua',
      lastName: 'Mitchell',
      __typename: 'User',
      email: 'joshua.mitchell@example.com',
      isActive: true,
      avatar: null,
    },
    {
      id: 'VXNlcjoyMw==',
      firstName: 'Bryan',
      lastName: 'Rodgers',
      __typename: 'User',
      email: 'bryan.rodgers@example.com',
      isActive: true,
      avatar: null,
    },
  ],
  __typename: 'Group',
  permissions: [
    {
      code: PermissionCode.ManagePages,
      name: 'Manage pages.',
      __typename: 'Permission',
    },
  ],
};

export const users: RelayToFlat<NonNullable<SearchStaffMembersQuery['search']>> = [
  {
    node: {
      id: 'VXNlcjoyMQ==',
      email: 'admin@example.com',
      firstName: '',
      lastName: '',
      isActive: true,
      avatar: {
        alt: null,
        url: avatarImg,
        __typename: 'Image' as const,
      },
      __typename: 'User' as const,
    },
    __typename: 'UserCountableEdge' as const,
  },
  {
    node: {
      id: 'VXNlcjoyMw==',
      email: 'bryan.rodgers@example.com',
      firstName: 'Bryan',
      lastName: 'Rodgers',
      isActive: true,
      avatar: {
        alt: null,
        url: avatarImg,
        __typename: 'Image' as const,
      },
      __typename: 'User' as const,
    },
    __typename: 'UserCountableEdge' as const,
  },
  {
    node: {
      id: 'VXNlcjoyMg==',
      email: 'joshua.mitchell@example.com',
      firstName: 'Joshua',
      lastName: 'Mitchell',
      isActive: true,
      avatar: {
        alt: null,
        url: avatarImg,
        __typename: 'Image' as const,
      },
      __typename: 'User' as const,
    },
    __typename: 'UserCountableEdge' as const,
  },
  {
    node: {
      id: 'VXNlcjoyMg==',
      email: 'joshua.mitchell@example.com',
      firstName: 'Joshua',
      lastName: 'Mitchell',
      isActive: true,
      avatar: {
        alt: null,
        url: avatarImg,
        __typename: 'Image' as const,
      },
      __typename: 'User' as const,
    },
    __typename: 'UserCountableEdge' as const,
  },
].map((edge) => edge.node);
