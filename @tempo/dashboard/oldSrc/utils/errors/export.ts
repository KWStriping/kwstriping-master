import type { ExportErrorFragment } from '@tempo/api/generated/graphql';

import { getCommonFormFieldErrorMessage } from './common';

function getExportErrorMessage(
  err: Omit<ExportErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  return getCommonFormFieldErrorMessage(err, t);
}

export default getExportErrorMessage;
