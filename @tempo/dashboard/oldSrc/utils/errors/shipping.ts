import type { TFunction } from '@tempo/next/i18n';
import type { ShippingErrorFragment } from '@tempo/api/generated/graphql';
import { ShippingErrorCode } from '@tempo/api/generated/constants';

import { getCommonFormFieldErrorMessage } from './common';

const messages = {
  alreadyExists: {
    id: 'VIABHy',
    defaultMessage: 'Default shipping zone already exists',
    description: 'error message',
  },
  lessThanMin: {
    id: 'AdmPca',
    defaultMessage: 'Max value cannot be less than min value',
    description: 'error message',
  },
};

function getShippingErrorMessage(
  err: Omit<ShippingErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  if (err) {
    switch (err.code) {
      case ShippingErrorCode.AlreadyExists:
        return t('dashboard_lreadyExists', messages.alreadyExists.defaultMessage);
      case ShippingErrorCode.MaxLessThanMin:
        return t('dashboard_essThanMin', messages.lessThanMin.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getShippingErrorMessage;
