import type { ChannelFragment } from '@tempo/api/generated/graphql';
import { defaultActiveChannelPaymentProviders } from '@tempo/checkout/config/defaults';
import type {
  ChannelActivePaymentProviders,
  PublicSettingsValues,
} from '@tempo/checkout/types/api';

export const mergeChannelsWithPaymentProvidersSettings = (
  settings: PublicSettingsValues,
  channels?: ChannelFragment[] | null
): ChannelActivePaymentProviders =>
  channels?.reduce((assignedSettings, channel) => {
    const channelSettings = assignedSettings[channel.id] || defaultActiveChannelPaymentProviders;

    return {
      ...assignedSettings,
      [channel.id]: channelSettings,
    };
  }, settings.channelActivePaymentProviders) || settings.channelActivePaymentProviders;
