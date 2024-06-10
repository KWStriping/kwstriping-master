import type { OrderQuery, OrderQueryVariables, OrderFragment } from '@core/api';
import { OrderDocument } from '@core/api';
import { getServerSideClient } from '@core/urql/client';
import type { Errors } from './types';

export const getOrder = async (
  id: OrderQueryVariables['id']
): Promise<
  | {
      data: OrderFragment;
    }
  | {
      errors: Errors;
    }
> => {
  const { data, error } = await getServerSideClient().query(OrderDocument, { id }).toPromise();

  if (error) {
    throw error;
  }

  if (!data?.order) {
    return {
      errors: ['ORDER_DOES_NOT_EXIST'],
    };
  }

  if (process.env.DEMO_MODE) {
    return {
      data: {
        ...data?.order,
        userEmail: 'checkout@example.com',
      },
    };
  }

  return { data: data?.order };
};
