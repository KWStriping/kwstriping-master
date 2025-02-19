import type { CountryCode } from '@tempo/api/generated/graphql';
import { ChannelBySlugDocument } from '@tempo/api/generated/graphql';
import { useQuery } from '@tempo/api/hooks/useQuery';
import { useCallback, useMemo } from 'react';

interface UseAddressAvailabilityProps {
  pause: boolean;
}

export const useAddressAvailability = (
  { pause }: UseAddressAvailabilityProps = { pause: false }
) => {
  const { data } = useQuery(ChannelBySlugDocument, {
    variables: { slug: 'default' },
    skip: pause,
  });

  const availableShippingCountries: CountryCode[] = useMemo(
    () => (data?.channel?.countries?.map(({ code }) => code) as CountryCode[]) || [],
    [data?.channel]
  );

  const isAvailable = useCallback(
    ({ country }: { country: { code: string } }) => {
      if (pause) {
        return true;
      }

      return availableShippingCountries.includes(country?.code as CountryCode);
    },
    [pause, availableShippingCountries]
  );

  return { isAvailable };
};
