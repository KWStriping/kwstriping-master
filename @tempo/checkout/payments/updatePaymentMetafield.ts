import type {
  OrderUpdatePaymentMetafieldMutation,
  OrderUpdatePaymentMetafieldMutationVariables,
} from '@tempo/api/generated/graphql';
import { OrderUpdatePaymentMetafieldDocument } from '@tempo/api/generated/graphql';
import { getServerSideClient } from '@tempo/api/client';
import type { OrderPaymentMetafield } from '@tempo/checkout/types/common';

export const updatePaymentMetafield = async (
  orderId: OrderUpdatePaymentMetafieldMutationVariables['orderId'],
  payment: OrderPaymentMetafield
) => {
  const { data, error } = await getServerSideClient()
    .mutation<OrderUpdatePaymentMetafieldMutation, OrderUpdatePaymentMetafieldMutationVariables>(
      OrderUpdatePaymentMetafieldDocument,
      {
        orderId,
        data: JSON.stringify(payment),
      }
    )
    .toPromise();

  return error || data?.updatePrivateMetadata?.errors ? false : true;
};
