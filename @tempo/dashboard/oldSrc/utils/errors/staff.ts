import type { StaffErrorFragment } from '@tempo/api/generated/graphql';
import type { TFunction } from '@tempo/next/i18n';

import getAccountErrorMessage from './account';

function getStaffErrorMessage(err: StaffErrorFragment, t: TFunction): string {
  return getAccountErrorMessage(err, t);
}

export default getStaffErrorMessage;
