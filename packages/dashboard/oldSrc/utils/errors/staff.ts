import type { StaffErrorFragment } from '@core/api/graphql';
import type { TFunction } from '@core/i18n';

import getAccountErrorMessage from './account';

function getStaffErrorMessage(err: StaffErrorFragment, t: TFunction): string {
  return getAccountErrorMessage(err, t);
}

export default getStaffErrorMessage;
