import type { ShippingErrorFragment } from '@tempo/api/generated/graphql';
import { ShippingErrorCode } from '@tempo/api/generated/constants';
import type { TFunction } from '@tempo/next/i18n';
import getShippingErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/shipping';

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
      return t('dashboard_price', messages.price.defaultMessage);
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
      return t('dashboard_eight', messages.weight.defaultMessage);
    case ShippingErrorCode.Invalid:
      return t('dashboard_invalid', messages.invalid.defaultMessage);
    default:
      getShippingErrorMessage(err, t);
  }
}
