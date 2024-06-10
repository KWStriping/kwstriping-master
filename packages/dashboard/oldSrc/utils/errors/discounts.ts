import type { TFunction } from '@core/i18n';
import { DiscountErrorCode } from '@core/api/constants';
import type { DiscountErrorFragment } from '@core/api/graphql';

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
  t: TFunction
): string {
  if (err) {
    switch (err.code) {
      case DiscountErrorCode.AlreadyExists:
        return t('dashboard.lreadyExists', messages.alreadyExists.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getDiscountErrorMessage;
