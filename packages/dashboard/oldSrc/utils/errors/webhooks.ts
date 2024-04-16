import type { WebhookErrorFragment } from '@core/api/graphql';
import type { TFunction } from '@core/i18n';

import { getCommonFormFieldErrorMessage } from './common';

function getWebhookErrorMessage(
  err: Omit<WebhookErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  return getCommonFormFieldErrorMessage(err, t);
}

export default getWebhookErrorMessage;
