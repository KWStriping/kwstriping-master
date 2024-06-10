import type { WarehouseErrorFragment } from '@core/api/graphql';
import { WarehouseErrorCode } from '@core/api/constants';
import type { TFunction } from '@core/i18n';

import { getCommonFormFieldErrorMessage } from './common';

const messages = {
  slugUnique: {
    id: 'nKjLjT',
    defaultMessage: 'Slug must be unique for each warehouse',
    description: 'error message',
  },
};

function getWarehouseErrorMessage(
  err: Omit<WarehouseErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  return getCommonFormFieldErrorMessage(err, t);
}

export function getWarehouseSlugErrorMessage(
  err: Omit<WarehouseErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  if (err) {
    switch (err.code) {
      case WarehouseErrorCode.Unique:
        return t('dashboard.lugUnique', messages.slugUnique.defaultMessage);
      default:
        return getWarehouseErrorMessage(err, t);
    }
  }

  return undefined;
}

export default getWarehouseErrorMessage;
