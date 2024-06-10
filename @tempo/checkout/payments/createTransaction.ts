import type { TransactionCreateMutation, TransactionCreateMutationVariables } from '@tempo/api/generated/graphql';
import { TransactionCreateDocument } from '@tempo/api/generated/graphql';
import { getServerSideClient } from '@tempo/api/client';

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
