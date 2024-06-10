import type {
  OrderUpdatePaymentMetafieldMutation,
  OrderUpdatePaymentMetafieldMutationVariables,
} from '@core/api';
import { OrderUpdatePaymentMetafieldDocument } from '@core/api';
import { getServerSideClient } from '@core/urql/client';
import type { OrderPaymentMetafield } from '@core/checkout/types/common';

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
