import type {
  TransactionProcessedEventsQuery,
  TransactionProcessedEventsQueryVariables,
} from '@core/api';
import { TransactionProcessedEventsDocument } from '@core/api';
import { getServerSideClient } from '@core/urql/client';
import type { TransactionProcessedEvents } from '@core/checkout/types';

export const getTransactionProcessedEvents = async (
  args: TransactionProcessedEventsQueryVariables
) => {
  const { data, error } = await getServerSideClient()
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
