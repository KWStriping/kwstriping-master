import type { ChannelFragment } from '@core/api';
import { defaultActiveChannelPaymentProviders } from '@core/checkout/config/defaults';
import type {
  ChannelActivePaymentProviders,
  PublicSettingsValues,
} from '@core/checkout/types/api';

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
