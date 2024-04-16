import type { TransactionCreateMutation, TransactionCreateMutationVariables } from '@core/api';
import { TransactionCreateDocument } from '@core/api';
import { getServerSideClient } from '@core/urql/client';

export const createTransaction = async (args: TransactionCreateMutationVariables) => {
  const { data, error } = await getServerSideClient()
    .mutation<TransactionCreateMutation, TransactionCreateMutationVariables>(
      TransactionCreateDocument,
      args
    )
    .toPromise();

  console.log(data?.createTransaction?.errors, error);

  return data?.createTransaction?.transaction?.id && data?.createTransaction?.errors?.length === 0
    ? true
    : false;
};
