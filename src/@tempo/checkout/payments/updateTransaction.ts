import type { TransactionUpdateMutationVariables } from '@tempo/api/generated/graphql';
import { TransactionUpdateDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';

export const updateTransaction = async (args: TransactionUpdateMutationVariables) => {
  // @todo handle errors
  const { data, errors } = await getClient().mutate({
    mutation: TransactionUpdateDocument,
    variables: args,
  });

  return !!data?.updateTransaction?.result?.id && errors?.length === 0;
};
