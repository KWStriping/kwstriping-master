import type {
  TransactionUpdateMutation,
  TransactionUpdateMutationVariables,
} from '@tempo/api/generated/graphql';
import { TransactionUpdateDocument } from '@tempo/api/generated/graphql';
import { getServerSideClient } from '@tempo/api/client';

export const updateTransaction = async (args: TransactionUpdateMutationVariables) => {
  // @todo handle errors
  const { data, error: _error } = await getServerSideClient()
    .mutation<
      TransactionUpdateMutation,
      TransactionUpdateMutationVariables
    >(TransactionUpdateDocument, args)
    .toPromise();

  return (
    !!data?.updateTransaction?.transaction?.id && data?.updateTransaction?.errors?.length === 0
  );
};
