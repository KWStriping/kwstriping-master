import { defaultActiveChannelPaymentProviders } from '@core/checkout/config/defaults';
import type { PrivateSettingsValues, PublicSettingsValues } from '@core/checkout/types/api';
import { mapPrivateMetafieldsToSettings } from './mapPrivateMetafieldsToSettings';
import { mapPrivateSettingsToMetadata } from './mapPrivateSettingsToMetadata';
import { mergeChannelsWithPaymentProvidersSettings } from './utils';

export const getActivePaymentProvidersSettings = async () => {
  const settings = {} as PublicSettingsValues; // TODO
  const data = {} as any; // TODO
  return mergeChannelsWithPaymentProvidersSettings(settings, data?.channels);
};

export const getChannelActivePaymentProvidersSettings = async (channelId: string) => {
  const settings = {} as any; // TODO

  return (
    settings.channelActivePaymentProviders?.[channelId] || defaultActiveChannelPaymentProviders
  );
};

export const setPrivateSettings = async (
  apiUrl: string,
  settings: PrivateSettingsValues<'unencrypted'>
) => {
  const metadata = mapPrivateSettingsToMetadata(settings);

  const appId = '';
  const data = {} as any; // TODO

  return mapPrivateMetafieldsToSettings(
    data?.updatePrivateMetadata?.item?.privateMetafields || {},
    true
  );
};
