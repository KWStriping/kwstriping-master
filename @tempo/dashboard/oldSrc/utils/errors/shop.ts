import { ShopErrorCode } from '@tempo/api/generated/constants';
import type { ShopErrorFragment } from '@tempo/api/generated/graphql';

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
        return t('dashboard_lreadyExists', messages.alreadyExists.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getShopErrorMessage;
