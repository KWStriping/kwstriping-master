import type { StaffErrorFragment } from '@tempo/api/generated/graphql';

import getAccountErrorMessage from './account';

function getStaffErrorMessage(err: StaffErrorFragment): string {
  return getAccountErrorMessage(err, t);
}

export default getStaffErrorMessage;
