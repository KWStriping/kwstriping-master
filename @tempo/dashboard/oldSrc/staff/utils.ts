import type { StaffDetailsFormData } from '@tempo/dashboard/components/StaffDetailsPage';
import type { StaffMemberDetailsFragment, UserFragment } from '@tempo/api/generated/graphql';
import difference from 'lodash-es/difference';

/**
 * Return lists of groups which have to be added and removed from user.
 */
export const groupsDiff = (user: StaffMemberDetailsFragment, formData: StaffDetailsFormData) => {
  const newGroups = formData.groups;
  const oldGroups = user.groups.map((u) => u.id);

  return {
    addGroups: difference(newGroups, oldGroups),
    removeGroups: difference(oldGroups, newGroups),
  };
};

export const isMemberActive = (staffMember: StaffMemberDetailsFragment | UserFragment) => {
  if (staffMember && 'isActive' in staffMember) {
    return staffMember.isActive;
  }

  return false;
};

export const getMemberGroups = (
  staffMember: StaffMemberDetailsFragment | UserFragment
) => {
  if (staffMember && 'groups' in staffMember) {
    return staffMember.groups;
  }

  return [];
};
