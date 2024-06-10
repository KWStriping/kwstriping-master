import type {
  TransactionUpdateProcessedEventsMutation,
  TransactionUpdateProcessedEventsMutationVariables,
} from '@tempo/api/generated/graphql';
import { TransactionUpdateProcessedEventsDocument } from '@tempo/api/generated/graphql';
import { getServerSideClient } from '@tempo/api/client';

export const updateTransactionProcessedEvents = async (
  args: TransactionUpdateProcessedEventsMutationVariables
) => {
  const { data, error } = await getServerSideClient()
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
