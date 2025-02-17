import type { TransactionProcessedEventsQueryVariables } from '@tempo/api/generated/graphql';
import { TransactionProcessedEventsDocument } from '@tempo/api/generated/graphql';
import { getServerSideClient } from '@tempo/api/client';
import type { TransactionProcessedEvents } from '@tempo/checkout/types';

export const getTransactionProcessedEvents = async (
  args: TransactionProcessedEventsQueryVariables
) => {
  const { data, error } = await getServerSideClient()
    .query(TransactionProcessedEventsDocument, args)
    .toPromise();

  if (error) {
    throw error;
  }

  return JSON.parse(data?.transaction?.processedEvents ?? '[]') as TransactionProcessedEvents;
};
