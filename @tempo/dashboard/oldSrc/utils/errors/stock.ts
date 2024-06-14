import type { BulkStockErrorFragment, StockErrorFragment } from '@tempo/api/generated/graphql';
import { StockErrorCode } from '@tempo/api/generated/constants';

import { getCommonFormFieldErrorMessage } from './common';
import getProductErrorMessage from './product';

const messages = {
  slugUnique: {
    id: 'QFBjlV',
    defaultMessage: 'Stock for this warehouse already exists for this product variant',
    description: 'error message',
  },
};

function getStockErrorMessage(
  err: Omit<StockErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  if (err) {
    switch (err.code) {
      case StockErrorCode.Unique:
        return t('dashboard_lugUnique', messages.slugUnique.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export function getBulkStockErrorMessage(
  err: Omit<BulkStockErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  return getProductErrorMessage(err, t);
}

export default getStockErrorMessage;
