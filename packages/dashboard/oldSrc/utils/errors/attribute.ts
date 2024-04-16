import type { TFunction } from '@core/i18n';
import type { AttributeErrorFragment } from '@core/api/graphql';
import { AttributeErrorCode } from '@core/api/constants';

import { getCommonFormFieldErrorMessage } from './common';

const messages = {
  alreadyExists: {
    id: 'KFv8hX',
    defaultMessage: 'An attribute already exists.',
  },
  nameAlreadyTaken: {
    id: 'FuAV5G',
    defaultMessage: 'This name is already taken. Please provide another.',
  },
  notFound: {
    id: 'SKFr04',
    defaultMessage: 'Attribute not found.',
  },
};

function getAttributeErrorMessage(
  err: Omit<AttributeErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  if (err) {
    switch (err.code) {
      case AttributeErrorCode.AlreadyExists:
        return t('dashboard.lreadyExists', messages.alreadyExists.defaultMessage);
      case AttributeErrorCode.Unique:
        return t('dashboard.nameAlreadyTaken', messages.nameAlreadyTaken.defaultMessage);
      case AttributeErrorCode.NotFound:
        return t('dashboard.otFound', messages.notFound.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getAttributeErrorMessage;
