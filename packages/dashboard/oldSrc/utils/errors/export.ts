import type { TFunction } from '@core/i18n';
import type { ExportErrorFragment } from '@core/api/graphql';

import { getCommonFormFieldErrorMessage } from './common';

function getExportErrorMessage(
  err: Omit<ExportErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  return getCommonFormFieldErrorMessage(err, t);
}

export default getExportErrorMessage;
