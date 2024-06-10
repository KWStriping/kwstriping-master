import type { ShippingErrorFragment } from '@core/api/graphql';
import { ShippingErrorCode } from '@core/api/constants';
import getShippingErrorMessage from '@dashboard/oldSrc/utils/errors/shipping';
import type { TFunction } from '@core/i18n';

const messages = {
  invalid: {
    id: '57IYpr',
    defaultMessage: 'Value is invalid',
    description: 'error message',
  },
  price: {
    id: 'pwqwcy',
    defaultMessage: 'Maximum price cannot be lower than minimum',
    description: 'error message',
  },
  weight: {
    id: 'H27/Gy',
    defaultMessage: 'Maximum weight cannot be lower than minimum',
    description: 'error message',
  },
};

export function getShippingPriceRateErrorMessage(
  err: ShippingErrorFragment,
  t: TFunction
): string {
  switch (err?.code) {
    case ShippingErrorCode.MaxLessThanMin:
      return t('dashboard.price', messages.price.defaultMessage);
    default:
      getShippingErrorMessage(err, t);
  }
}

export function getShippingWeightRateErrorMessage(
  err: ShippingErrorFragment,
  t: TFunction
): string {
  switch (err?.code) {
    case ShippingErrorCode.MaxLessThanMin:
      return t('dashboard.eight', messages.weight.defaultMessage);
    case ShippingErrorCode.Invalid:
      return t('dashboard.invalid', messages.invalid.defaultMessage);
    default:
      getShippingErrorMessage(err, t);
  }
}
