import type { MenuErrorFragment } from '@tempo/api/generated/graphql';

import { getCommonFormFieldErrorMessage } from './common';

function getMenuErrorMessage(
  err: Omit<MenuErrorFragment, '__typename'> | undefined,
): string {
  return getCommonFormFieldErrorMessage(err, t);
}

export default getMenuErrorMessage;
