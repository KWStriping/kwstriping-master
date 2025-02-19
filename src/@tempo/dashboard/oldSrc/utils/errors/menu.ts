import type { MenuErrorFragment } from '@tempo/api/generated/graphql';
import type { TFunction } from '@tempo/next/i18n';

import { getCommonFormFieldErrorMessage } from './common';

function getMenuErrorMessage(
  err: Omit<MenuErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  return getCommonFormFieldErrorMessage(err, t);
}

export default getMenuErrorMessage;
