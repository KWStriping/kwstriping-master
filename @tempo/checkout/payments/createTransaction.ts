import type { TransactionCreateMutationVariables } from '@tempo/api/generated/graphql';
import { TransactionCreateDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/client';

export const createTransaction = async (args: TransactionCreateMutationVariables) => {
  const { data, errors } = await getClient().mutate({
    mutation: TransactionCreateDocument,
    variables: args,
  });

  return data?.createTransaction?.result?.id && errors?.length === 0 ? true : false;
};
