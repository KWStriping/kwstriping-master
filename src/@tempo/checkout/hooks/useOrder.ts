import { OrderDocument, type OrderFragment } from '@tempo/api/generated/graphql';
import { useQuery } from '@tempo/api/hooks';

export const useOrder = (id: string) => {
  const { data } = useQuery(OrderDocument, {
    variables: { id },
  });

  return { order: data?.order as OrderFragment };
};
