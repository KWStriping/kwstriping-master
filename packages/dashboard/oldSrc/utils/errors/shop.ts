import type { TFunction } from '@core/i18n';
import { ShopErrorCode } from '@core/api/constants';
import type { ShopErrorFragment } from '@core/api/graphql';

import { getCommonFormFieldErrorMessage } from './common';

const messages = {
  alreadyExists: {
    id: 'm8cjcK',
    defaultMessage: 'Authorization key with this type already exists',
    description: 'add authorization key error',
  },
};

function getShopErrorMessage(
  err: Omit<ShopErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  if (err) {
    switch (err.code) {
      case ShopErrorCode.AlreadyExists:
        return t('dashboard.lreadyExists', messages.alreadyExists.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getShopErrorMessage;
