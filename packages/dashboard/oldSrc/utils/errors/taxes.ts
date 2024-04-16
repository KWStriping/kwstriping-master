import type { TFunction } from '@core/i18n';
import type {
  TaxClassCreateErrorFragment,
  TaxClassDeleteErrorFragment,
  TaxClassUpdateErrorFragment,
} from '@core/api/graphql';

import type { CommonError, CommonErrorCode } from './common';
import { getCommonFormFieldErrorMessage } from './common';

export type TaxClassError =
  | TaxClassUpdateErrorFragment
  | TaxClassCreateErrorFragment
  | TaxClassDeleteErrorFragment
  | CommonError<CommonErrorCode>;

function getTaxesErrorMessage(
  err: Omit<TaxClassError, '__typename'> | undefined,
  t: TFunction
): string {
  return getCommonFormFieldErrorMessage(err, t);
}

export default getTaxesErrorMessage;
