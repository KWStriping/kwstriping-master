import type {
  TransactionUpdateProcessedEventsMutation,
  TransactionUpdateProcessedEventsMutationVariables,
} from '@tempo/api/generated/graphql';
import { TransactionUpdateProcessedEventsDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';

export const updateTransactionProcessedEvents = async (
  args: TransactionUpdateProcessedEventsMutationVariables
) => {
  const { data, error } = await getClient()
    .mutation<
      TransactionUpdateProcessedEventsMutation,
      TransactionUpdateProcessedEventsMutationVariables
    >(TransactionUpdateProcessedEventsDocument, args)
    .toPromise();

  const queryErrors = data?.updateMetadata?.errors ?? [];

  if (!error && queryErrors.length === 0) {
    return true;
  }

  console.error('Error while saving event as processed', error ?? queryErrors);
  return false;
};
