import type { WebhookErrorFragment } from '@tempo/api/generated/graphql';
import type { TFunction } from '@tempo/next/i18n';

import { getCommonFormFieldErrorMessage } from './common';

function getWebhookErrorMessage(
  err: Omit<WebhookErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  return getCommonFormFieldErrorMessage(err, t);
}

export default getWebhookErrorMessage;
