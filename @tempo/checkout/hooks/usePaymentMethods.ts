import {
  getParsedPaymentMethods,
  getParsedPaymentProviders,
} from '@tempo/checkout/components/sections/~PaymentSection/utils';
import type { ChannelActivePaymentProvidersByChannel } from '@tempo/checkout/types/payments-api';
import { useFetch, urlJoinTrailingSlash } from '@tempo/ui/hooks/useFetch';
import { useShopSettings } from '@tempo/ui/providers';

const API_URL = 'http://localhost:3000/api/'; // TODO

export const usePaymentMethods = (channelId: Maybe<string>) => {
  // TODO
  const { paymentProviders: availableProviders, paymentMethods: availableMethods } =
    useShopSettings();
  const [{ data, fetching }] = useFetch<ChannelActivePaymentProvidersByChannel>(
    urlJoinTrailingSlash(API_URL, 'payments/active-providers', channelId as string),
    {
      args: { channelId },
      skip: !channelId,
    }
  );
  // console.log('>>> usePaymentMethods', data);
  const loading = fetching || !channelId;
  const methods = channelId ? [...getParsedPaymentMethods(data), ...availableMethods] : [];
  const providers = channelId ? [...getParsedPaymentProviders(data), ...availableProviders] : [];

  return {
    methods,
    providers,
    loading,
  };
};
