import avatarImage from '@dashboard/assets/images/avatars/avatar1.png';
import type { StaffListQuery, StaffMemberDetailsFragment } from '@core/api/graphql';
import { permissions } from '@dashboard/oldSrc/fixtures';
import type { RelayToFlat } from '@dashboard/oldSrc/types';

export const staffMembers: RelayToFlat<NonNullable<StaffListQuery['staffUsers']>> = [
  {
    avatar: {
      __typename: 'Image' as const,
      url: avatarImage,
    },
    email: 'admin@example.com',
    firstName: 'Chris',
    id: 'VXNlcjoyMQ==',
    isActive: true,
    lastName: 'Cooper',
  },
  {
    avatar: {
      __typename: 'Image' as const,
      url: avatarImage,
    },
    email: 'admin@example.com',
    firstName: 'Jacob',
    id: 'VXNlcjoyMQ==',
    isActive: false,
    lastName: 'Smith',
  },
  {
    avatar: {
      __typename: 'Image' as const,
      url: avatarImage,
    },
    email: 'admin@example.com',
    firstName: 'Jacob',
    id: 'VXNlcjoyMQ==',
    isActive: true,
    lastName: 'Smith',
  },
  {
    avatar: {
      __typename: 'Image' as const,
      url: avatarImage,
    },
    email: 'admin@example.com',
    firstName: 'Jacob',
    id: 'VXNlcjoyMQ==',
    isActive: true,
    lastName: 'Smith',
  },
  {
    avatar: {
      __typename: 'Image' as const,
      url: avatarImage,
    },
    email: 'admin@example.com',
    firstName: 'Jacob',
    id: 'VXNlcjoyMQ==',
    isActive: true,
    lastName: 'Smith',
  },
  {
    avatar: {
      __typename: 'Image' as const,
      url: avatarImage,
    },
    email: 'admin@example.com',
    firstName: 'Jacob',
    id: 'VXNlcjoyMQ==',
    isActive: true,
    lastName: 'Smith',
  },
  {
    avatar: {
      __typename: 'Image' as const,
      url: avatarImage,
    },
    email: 'admin@example.com',
    firstName: 'Jacob',
    id: 'VXNlcjoyMQ==',
    isActive: false,
    lastName: 'Smith',
  },
  {
    avatar: {
      __typename: 'Image' as const,
      url: avatarImage,
    },
    email: 'admin@example.com',
    firstName: 'Jacob',
    id: 'VXNlcjoyMQ==',
    isActive: true,
    lastName: 'Smith',
  },
  {
    avatar: {
      __typename: 'Image' as const,
      url: avatarImage,
    },
    email: 'admin@example.com',
    firstName: 'Jacob',
    id: 'VXNlcjoyMQ==',
    isActive: true,
    lastName: 'Smith',
  },
  {
    avatar: {
      __typename: 'Image' as const,
      url: avatarImage,
    },
    email: 'admin@example.com',
    firstName: 'Jacob',
    id: 'VXNlcjoyMQ==',
    isActive: false,
    lastName: 'Smith',
  },
  {
    avatar: {
      __typename: 'Image' as const,
      url: avatarImage,
    },
    email: 'admin@example.com',
    firstName: 'Jacob',
    id: 'VXNlcjoyMQ==',
    isActive: false,
    lastName: 'Smith',
  },
  {
    avatar: {
      __typename: 'Image' as const,
      url: avatarImage,
    },
    email: 'admin@example.com',
    firstName: 'Jacob',
    id: 'VXNlcjoyMQ==',
    isActive: true,
    lastName: 'Smith',
  },
].map((staffMember) => ({ __typename: 'User' as const, ...staffMember }));
export const staffMember: StaffMemberDetailsFragment = {
  __typename: 'User',
  avatar: { __typename: 'Image' as const, url: avatarImage },
  email: 'admin@example.com',
  firstName: 'Jacob',
  id: 'VXNlcjoyMQ==',
  isActive: true,
  lastName: 'Smith',
  groups: [],
  userPermissions: permissions.map((p) => ({
    ...p,
    __typename: 'UserPermission',
  })),
};
