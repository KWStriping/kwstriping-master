import type { TransactionUpdateMutation, TransactionUpdateMutationVariables } from '@core/api';
import { TransactionUpdateDocument } from '@core/api';
import { getServerSideClient } from '@core/urql/client';

export const updateTransaction = async (args: TransactionUpdateMutationVariables) => {
  // @todo handle errors
  const { data, error: _error } = await getServerSideClient()
    .mutation<TransactionUpdateMutation, TransactionUpdateMutationVariables>(
      TransactionUpdateDocument,
      args
    )
    .toPromise();

  return (
    !!data?.updateTransaction?.transaction?.id && data?.updateTransaction?.errors?.length === 0
  );
};
