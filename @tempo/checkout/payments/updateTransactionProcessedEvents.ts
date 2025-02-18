import type { TransactionUpdateProcessedEventsMutationVariables } from '@tempo/api/generated/graphql';
import { TransactionUpdateProcessedEventsDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';

export const updateTransactionProcessedEvents = async (
  args: TransactionUpdateProcessedEventsMutationVariables
) => {
  const { data, errors } = await getClient().mutate({
    mutation: TransactionUpdateProcessedEventsDocument,
    variables: args,
  });

  const queryErrors = data?.updateMetadata?.errors ?? [];

  if (!errors && queryErrors.length === 0) {
    return true;
  }

  console.error('Error while saving event as processed', errors ?? queryErrors);
  return false;
};
