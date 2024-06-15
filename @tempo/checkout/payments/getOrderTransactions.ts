import type { OrderTransactionsQueryVariables } from '@tempo/api/generated/graphql';
import { OrderTransactionsDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';

export const getOrderTransactions = async (args: OrderTransactionsQueryVariables) => {
  // @todo handle errors
  const { data, error } = await getClient().query(OrderTransactionsDocument, args).toPromise();

  if (error?.graphQLErrors?.length === 0) {
    return data?.order?.transactions;
  }

  return [];
};
