import type { OrderUpdatePaymentMetafieldMutationVariables } from '@tempo/api/generated/graphql';
import { OrderUpdatePaymentMetafieldDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/client';
import type { OrderPaymentMetafield } from '@tempo/checkout/types/common';

export const updatePaymentMetafield = async (
  orderId: OrderUpdatePaymentMetafieldMutationVariables['orderId'],
  payment: OrderPaymentMetafield
) => {
  const { data, errors } = await getClient().mutate({
    mutation: OrderUpdatePaymentMetafieldDocument,
    variables: {
      orderId,
      data: JSON.stringify(payment),
    },
  });

  return !!errors?.length;
};
