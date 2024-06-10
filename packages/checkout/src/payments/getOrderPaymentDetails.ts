import type { OrderPaymentDetailsQuery, OrderPaymentDetailsQueryVariables } from '@core/api';
import { OrderPaymentDetailsDocument } from '@core/api';
import { getServerSideClient } from '@core/urql/client';

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
