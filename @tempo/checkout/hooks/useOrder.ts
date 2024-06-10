import type { OrderFragment } from '@tempo/api/generated/graphql';
import { useOrderQuery } from '@tempo/api/generated/graphql';

export const useOrder = (id: string) => {
  const [{ data, fetching: loading }] = useOrderQuery({
    variables: { id },
  });

  return { order: data?.order as OrderFragment, loading };
};
