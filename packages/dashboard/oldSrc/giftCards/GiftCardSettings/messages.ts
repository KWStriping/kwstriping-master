import type { TFunction } from '@core/i18n';
import type { GiftCardSettingsErrorFragment } from '@core/api/graphql';
import { getCommonFormFieldErrorMessage } from '@dashboard/oldSrc/utils/errors/common';

export const giftCardSettingsPageMessages = {
  title: {
    id: 'xHj9Qe',
    defaultMessage: 'Gift Cards Settings',
    description: 'gift card settings header',
  },
};

export function getGiftCardSettingsErrorMessage(
  error: Omit<GiftCardSettingsErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  return getCommonFormFieldErrorMessage(error, t);
}
