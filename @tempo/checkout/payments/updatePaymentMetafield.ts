import type {
  OrderUpdatePaymentMetafieldMutation,
  OrderUpdatePaymentMetafieldMutationVariables,
} from '@tempo/api/generated/graphql';
import { OrderUpdatePaymentMetafieldDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';
import type { OrderPaymentMetafield } from '@tempo/checkout/types/common';

export const updatePaymentMetafield = async (
  orderId: OrderUpdatePaymentMetafieldMutationVariables['orderId'],
  payment: OrderPaymentMetafield
) => {
  const { data, error } = await getClient()
    .mutation<OrderUpdatePaymentMetafieldMutation, OrderUpdatePaymentMetafieldMutationVariables>(
      OrderUpdatePaymentMetafieldDocument,
      {
        orderId,
        data: JSON.stringify(payment),
      }
    )
    .toPromise();

  return !!error?.graphQLErrors.length;
};
