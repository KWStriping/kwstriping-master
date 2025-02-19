import type { TFunction } from '@tempo/next/i18n';
import { ChannelErrorCode } from '@tempo/api/generated/constants';
import type { ChannelErrorFragment } from '@tempo/api/generated/graphql';

import { getCommonFormFieldErrorMessage } from './common';

const messages = {
  channelAlreadyExist: {
    id: 'DK+8PB',
    defaultMessage: 'This channel has already been created',
  },
  channelSameCurrency: {
    id: 'V2BBQu',
    defaultMessage: 'Currency in both channels must be the same',
  },
  channelUnique: {
    id: 'QFCUEt',
    defaultMessage: 'Slug must be unique',
  },
};

function getChannelsErrorMessage(
  err: Omit<ChannelErrorFragment, '__typename'> | undefined,
  t: TFunction
): string {
  if (err) {
    switch (err.code) {
      case ChannelErrorCode.AlreadyExists:
        return t('dashboard_channelAlreadyExist', messages.channelAlreadyExist.defaultMessage);
      case ChannelErrorCode.Unique:
        return t('dashboard_channelUnique', messages.channelUnique.defaultMessage);
      case ChannelErrorCode.ChannelsCurrencyMustBeTheSame:
        return t('dashboard_channelSameCurrency', messages.channelSameCurrency.defaultMessage);
    }
  }

  return getCommonFormFieldErrorMessage(err, t);
}

export default getChannelsErrorMessage;
