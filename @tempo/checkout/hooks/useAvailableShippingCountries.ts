import type { CountryCode } from '@tempo/api/generated/graphql';
import { ChannelDocument } from '@tempo/api/generated/graphql';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import { useQuery } from '@tempo/api/hooks/useQuery';
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
