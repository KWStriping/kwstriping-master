import * as m from '@paraglide/messages';
import type { IMessage } from '@dashboard/components/messages';
import { Temporal } from '@js-temporal/polyfill';

import type { GiftCardCreateCommonFormData } from '../GiftCardBulkCreateDialog/types';
import { updateGiftCardFormMessages } from '../GiftCardsList/messages';
import { createGiftCardMessages as messages } from './messages';
import type { GiftCardCreateMutation } from '@tempo/api/generated/graphql';
import { TimePeriodType } from '@tempo/api/generated/constants';

const addToCurrentDate = (
  currentDate: number,
  expiryPeriodAmount: number,
  unit: 'days' | 'weeks' | 'months' | 'years'
) => Temporal.PlainDate.from(currentDate).plus({ [unit]: expiryPeriodAmount });

export const getExpiryPeriodTerminationDate = (
  currentDate: number,
  expiryPeriodType: TimePeriodType,
  expiryPeriodAmount = 0
): Temporal.PlainDate | null => {
  switch (expiryPeriodType) {
    case TimePeriodType.Day:
      return addToCurrentDate(currentDate, expiryPeriodAmount, 'days');
    case TimePeriodType.Week:
      return addToCurrentDate(currentDate, expiryPeriodAmount, 'weeks');
    case TimePeriodType.Month:
      return addToCurrentDate(currentDate, expiryPeriodAmount, 'months');
    case TimePeriodType.Year:
      return addToCurrentDate(currentDate, expiryPeriodAmount, 'years');
    default:
      return null;
  }
};

export const getGiftCardExpiryError = (): IMessage => ({
  title: t(
    'dashboard_giftCardInvalidExpiryDateHeader',
    updateGiftCardFormMessages.giftCardInvalidExpiryDateHeader.defaultMessage
  ),
  text: t(
    'dashboard_giftCardInvalidExpiryDateContent',
    updateGiftCardFormMessages.giftCardInvalidExpiryDateContent.defaultMessage
  ),
  type: 'error',
});

export const getGiftCardCreateOnCompletedMessage = (
  errors: GiftCardCreateMutation['createGiftCard']['errors'],
  successMessage?: IMessage
): IMessage => {
  const hasExpiryError = errors.some((error) => error.field === 'expiryDate');
  const successGiftCardMessage = successMessage || {
    type: 'success',
    text: t(
      'dashboard_createdSuccessAlertTitle',
      messages.createdSuccessAlertTitle.defaultMessage
    ),
  };

  if (hasExpiryError) {
    return getGiftCardExpiryError(t);
  }

  return errors?.length
    ? {
        type: 'error',
        text: (m.dashboard_unknownError() ?? 'Unknown error'),
      }
    : successGiftCardMessage;
};

export const getGiftCardExpiryInputData = (
  {
    expirySelected,
    expiryType,
    expiryDate,
    expiryPeriodAmount,
    expiryPeriodType,
  }: GiftCardCreateCommonFormData,
  currentDate: number
): string => {
  if (!expirySelected) return;

  if (expiryType === 'EXPIRY_PERIOD') {
    return getExpiryPeriodTerminationDate(
      currentDate,
      expiryPeriodType,
      expiryPeriodAmount
    )?.toFormat('YYYY-MM-DD');
  }

  return expiryDate;
};
