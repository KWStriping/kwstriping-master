import type { TFunction } from '@core/i18n';
import type { GiftCardErrorFragment } from '@core/api/graphql';
import { GiftCardErrorCode } from '@core/api/constants';
import commonErrorMessages, {
  getCommonFormFieldErrorMessage,
} from '@dashboard/oldSrc/utils/errors/common';

export const updateGiftCardDetailsCardMessages = {
  title: {
    id: 'xPnZ0R',
    defaultMessage: 'Details',
    description: 'title',
  },
};

const giftCardErrorMessages = {
  notFound: {
    id: '29L5Yq',
    defaultMessage: "Couldn't find gift card",
    description: 'gift card not found message',
  },
};

export function getGiftCardErrorMessage(
  error: Omit<GiftCardErrorFragment, '__typename' | 'message'> | undefined,
  t: TFunction
): string {
  if (error) {
    switch (error.code) {
      case GiftCardErrorCode.NotFound:
        return t('dashboard.otFound', giftCardErrorMessages.notFound.defaultMessage);
      case GiftCardErrorCode.Invalid:
        return t('dashboard.invalid', commonErrorMessages.invalid.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(error, t);
}
