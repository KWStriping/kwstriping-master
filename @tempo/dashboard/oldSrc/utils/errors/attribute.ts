import type { AttributeErrorFragment } from '@tempo/api/generated/graphql';
import { AttributeErrorCode } from '@tempo/api/generated/constants';

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
): string {
  if (err) {
    switch (err.code) {
      case AttributeErrorCode.AlreadyExists:
        return t('dashboard_lreadyExists', messages.alreadyExists.defaultMessage);
      case AttributeErrorCode.Unique:
        return t('dashboard_nameAlreadyTaken', messages.nameAlreadyTaken.defaultMessage);
      case AttributeErrorCode.NotFound:
        return t('dashboard_otFound', messages.notFound.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getAttributeErrorMessage;
