import type { OrderTransactionsQuery, OrderTransactionsQueryVariables } from '@core/api';
import { OrderTransactionsDocument } from '@core/api';
import { getServerSideClient } from '@core/urql/client';

export const getOrderTransactions = async (args: OrderTransactionsQueryVariables) => {
  // @todo handle errors
  const { data, error: _error } = await getServerSideClient()
    .query(
      OrderTransactionsDocument,
      args
    )
    .toPromise();

  if (data?.order?.errors?.length === 0) {
    return data?.order?.transactions;
  }

  return [];
};
