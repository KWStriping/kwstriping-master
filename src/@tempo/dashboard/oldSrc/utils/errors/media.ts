import type { MediaErrorFragment } from '@tempo/api/generated/graphql';
import { MediaErrorCode } from '@tempo/api/generated/constants';
import type { TFunction } from '@tempo/next/i18n';

import { getCommonFormFieldErrorMessage } from './common';

const messages = {
  attributeAlreadyAssigned: {
    id: '+hib+V',
    defaultMessage: 'This attribute is already assigned.',
  },
  duplicatedInputItem: {
    id: 'b0EUPl',
    defaultMessage: 'Media with these attributes already exists.',
  },
  nameAlreadyTaken: {
    id: 'N7XGzW',
    defaultMessage: 'This name is already taken. Please provide another.',
  },
  notFound: {
    id: 'bA/PHQ',
    defaultMessage: 'Media not found.',
  },
};

function getMediaErrorMessage(
  err: Omit<MediaErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  if (err) {
    switch (err.code) {
      case MediaErrorCode.Unique:
        return t('dashboard_nameAlreadyTaken', messages.nameAlreadyTaken.defaultMessage);
      case MediaErrorCode.AttributeAlreadyAssigned:
        return t(
          'dashboard_attributeAlreadyAssigned',
          messages.attributeAlreadyAssigned.defaultMessage
        );
      case MediaErrorCode.DuplicatedInputItem:
        return t('dashboard_uplicatedInputItem', messages.duplicatedInputItem.defaultMessage);
      case MediaErrorCode.NotFound:
        return t('dashboard_otFound', messages.notFound.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getMediaErrorMessage;
