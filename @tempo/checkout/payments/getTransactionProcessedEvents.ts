import type {
  TransactionProcessedEventsQuery,
  TransactionProcessedEventsQueryVariables,
} from '@tempo/api/generated/graphql';
import { TransactionProcessedEventsDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';
import type { TransactionProcessedEvents } from '@tempo/checkout/types';

export const getTransactionProcessedEvents = async (
  args: TransactionProcessedEventsQueryVariables
) => {
  const { data, error } = await getClient()
    .query(
      TransactionProcessedEventsDocument,
      args
    )
    .toPromise();

  if (error) {
    throw error;
  }

  return JSON.parse(data?.transaction?.processedEvents ?? '[]') as TransactionProcessedEvents;
};
