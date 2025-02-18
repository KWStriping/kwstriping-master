import type { OrderTransactionsQueryVariables } from '@tempo/api/generated/graphql';
import { OrderTransactionsDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';

export const getOrderTransactions = async (args: OrderTransactionsQueryVariables) => {
  // @todo handle errors
  const { data, errors } = await getClient().query({
    query: OrderTransactionsDocument,
    variables: args,
  });

  if (errors?.length === 0) {
    return data?.order?.transactions;
  }

  return [];
};
