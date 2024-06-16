import type { OrderPaymentDetailsQuery, OrderPaymentDetailsQueryVariables } from '@tempo/api/generated/graphql';
import { OrderPaymentDetailsDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';

import type { Errors } from './types';

export const getOrderPaymentDetails = async (id: OrderPaymentDetailsQueryVariables['id']) => {
  const { data, error } = await getClient()
    .query(OrderPaymentDetailsDocument, { id })
    .toPromise();

  if (error) {
    throw error;
  }

  if (!data?.order) {
    return {
      errors: ['ORDER_DOES_NOT_EXIST'] as Errors,
    };
  }

  return { data: data?.order };
};
