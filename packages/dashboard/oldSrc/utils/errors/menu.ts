import type { MenuErrorFragment } from '@core/api/graphql';
import type { TFunction } from '@core/i18n';

import { getCommonFormFieldErrorMessage } from './common';

function getMenuErrorMessage(
  err: Omit<MenuErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  return getCommonFormFieldErrorMessage(err, t);
}

export default getMenuErrorMessage;
