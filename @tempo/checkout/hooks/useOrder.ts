import {
  OrderDocument,
  type OrderFragment,
  type OrderQuery,
  type OrderQueryVariables,
} from '@tempo/api/generated/graphql';
import { useQuery } from '@tempo/api/hooks';

export const useOrder = (id: string) => {
  const { data, loading } = useQuery(OrderDocument, {
    variables: { id },
  });

  return { order: data?.order as OrderFragment, loading };
};
