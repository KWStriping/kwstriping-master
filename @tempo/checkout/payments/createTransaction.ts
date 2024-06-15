import type { TransactionCreateMutation, TransactionCreateMutationVariables } from '@tempo/api/generated/graphql';
import { TransactionCreateDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';

export const createTransaction = async (args: TransactionCreateMutationVariables) => {
  const { data, error } = await getClient()
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
