import type { CountryCode } from '@core/api';
import { ChannelDocument } from '@core/api';
import { useCheckout } from '@core/checkout/providers/CheckoutProvider';
import { useQuery } from '@core/urql/hooks/useQuery';
import { useMemo } from 'react';
import { assert } from 'tsafe/assert';

interface UseAvailableShippingCountries {
  availableShippingCountries: CountryCode[];
}

export const useAvailableShippingCountries = (): UseAvailableShippingCountries => {
  const { checkout } = useCheckout();
  assert(!!checkout);
  const [{ data }] = useQuery(ChannelDocument, {
    variables: { id: checkout.channel.id },
    pause: !checkout?.channel.id,
  });

  const availableShippingCountries: CountryCode[] = useMemo(
    () => (data?.channel?.countries?.map(({ code }) => code) as CountryCode[]) || [],
    [data?.channel?.countries]
  );

  return { availableShippingCountries };
};
