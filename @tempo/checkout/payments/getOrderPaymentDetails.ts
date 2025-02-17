import type { OrderPaymentDetailsQueryVariables } from '@tempo/api/generated/graphql';
import { OrderPaymentDetailsDocument } from '@tempo/api/generated/graphql';
import { getServerSideClient } from '@tempo/api/client';

import type { Errors } from './types';

export const getOrderPaymentDetails = async (id: OrderPaymentDetailsQueryVariables['id']) => {
  const { data, error } = await getServerSideClient()
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
