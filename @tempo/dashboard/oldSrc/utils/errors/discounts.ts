import { DiscountErrorCode } from '@tempo/api/generated/constants';
import type { DiscountErrorFragment } from '@tempo/api/generated/graphql';

import { getCommonFormFieldErrorMessage } from './common';

const messages = {
  alreadyExists: {
    id: 'stjHjY',
    defaultMessage: 'Promo code already exists',
    description: 'error message',
  },
};

function getDiscountErrorMessage(
  err: Omit<DiscountErrorFragment, '__typename'> | undefined,
): string {
  if (err) {
    switch (err.code) {
      case DiscountErrorCode.AlreadyExists:
        return t('dashboard_lreadyExists', messages.alreadyExists.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getDiscountErrorMessage;
