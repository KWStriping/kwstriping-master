import type { OrderPaymentDetailsQueryVariables } from '@tempo/api/generated/graphql';
import { OrderPaymentDetailsDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';

import type { Errors } from './types';

export const getOrderPaymentDetails = async (id: OrderPaymentDetailsQueryVariables['id']) => {
  const { data, errors } = await getClient().query({
    query: OrderPaymentDetailsDocument,
    variables: { id },
  });

  if (errors) {
    throw errors;
  }

  if (!data?.order) {
    return {
      errors: ['ORDER_DOES_NOT_EXIST'] as Errors,
    };
  }

  return { data: data?.order };
};
