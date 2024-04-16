import type { OrderFragment } from '@core/api';
import { useOrderQuery } from '@core/api';

export const useOrder = (id: string) => {
  const [{ data, fetching: loading }] = useOrderQuery({
    variables: { id },
  });

  return { order: data?.order as OrderFragment, loading };
};
