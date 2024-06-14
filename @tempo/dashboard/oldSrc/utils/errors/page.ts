import type { PageErrorFragment } from '@tempo/api/generated/graphql';
import { PageErrorCode } from '@tempo/api/generated/constants';

import { getCommonFormFieldErrorMessage } from './common';

const messages = {
  attributeAlreadyAssigned: {
    id: '+hib+V',
    defaultMessage: 'This attribute is already assigned.',
    description: 'error message',
  },
  duplicatedInputItem: {
    id: '1H+V6k',
    defaultMessage: 'Page with these attributes already exists.',
    description: 'error message',
  },
  nameAlreadyTaken: {
    id: 'N7XGzW',
    defaultMessage: 'This name is already taken. Please provide another.',
    description: 'error message',
  },
  notFound: {
    id: 'PCoO4D',
    defaultMessage: 'Page not found.',
    description: 'error message',
  },
};

function getPageErrorMessage(
  err: Omit<PageErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  if (err) {
    switch (err.code) {
      case PageErrorCode.Unique:
        return t('dashboard_nameAlreadyTaken', messages.nameAlreadyTaken.defaultMessage);
      case PageErrorCode.AttributeAlreadyAssigned:
        return t(
          'dashboard_attributeAlreadyAssigned',
          messages.attributeAlreadyAssigned.defaultMessage
        );
      case PageErrorCode.DuplicatedInputItem:
        return t('dashboard_uplicatedInputItem', messages.duplicatedInputItem.defaultMessage);
      case PageErrorCode.NotFound:
        return t('dashboard_otFound', messages.notFound.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getPageErrorMessage;
