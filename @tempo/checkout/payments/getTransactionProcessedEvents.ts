import type { TransactionProcessedEventsQueryVariables } from '@tempo/api/generated/graphql';
import { TransactionProcessedEventsDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/client';
import type { TransactionProcessedEvents } from '@tempo/checkout/types';

export const getTransactionProcessedEvents = async (
  args: TransactionProcessedEventsQueryVariables
) => {
  const { data, errors } = await getClient().query({
    query: TransactionProcessedEventsDocument,
    variables: args,
  });

  if (errors) {
    throw errors;
  }

  return JSON.parse(data?.transaction?.processedEvents ?? '[]') as TransactionProcessedEvents;
};
