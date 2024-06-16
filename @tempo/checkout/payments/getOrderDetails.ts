import type { OrderQuery, OrderQueryVariables, OrderFragment } from '@tempo/api/generated/graphql';
import { OrderDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';
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
  const { data, error } = await getClient().query(OrderDocument, { id }).toPromise();

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
