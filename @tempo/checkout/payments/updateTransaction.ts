import type {
  TransactionUpdateMutation,
  TransactionUpdateMutationVariables,
} from '@tempo/api/generated/graphql';
import { TransactionUpdateDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';

export const updateTransaction = async (args: TransactionUpdateMutationVariables) => {
  // @todo handle errors
  const { data, error } = await getClient()
    .mutation<
      TransactionUpdateMutation,
      TransactionUpdateMutationVariables
    >(TransactionUpdateDocument, args)
    .toPromise();

  return !!data?.updateTransaction?.result?.id && error?.graphQLErrors.length === 0;
};
