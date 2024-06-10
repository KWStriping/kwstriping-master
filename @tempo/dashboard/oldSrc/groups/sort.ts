import { getUserName } from '@tempo/utils/user';

import { MembersListUrlOrdering } from './urls';
import type { StaffMemberFragment } from '@tempo/api/generated/graphql';

export const sortMembers =
  (sort: string, asc: boolean) => (a: StaffMemberFragment, b: StaffMemberFragment) => {
    let valueA;
    let valueB;
    switch (sort) {
      case MembersListUrlOrdering.name:
        valueA = getUserName(a);
        valueB = getUserName(b);
        break;
      case MembersListUrlOrdering.email:
        valueA = a.email;
        valueB = b.email;
        break;
    }

    return asc ? ('' + valueA).localeCompare(valueB) : ('' + valueA).localeCompare(valueB) * -1;
  };
