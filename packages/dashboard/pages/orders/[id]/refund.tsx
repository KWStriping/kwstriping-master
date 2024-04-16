import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import OrderRefundPage from '@dashboard/components/orders/OrderRefundPage';
import type { OrderRefundSubmitData } from '@dashboard/components/orders/OrderRefundPage/form';
import {
  OrderRefundAmountCalculationMode,
  OrderRefundType,
} from '@dashboard/components/orders/OrderRefundPage/form';
import { OrderRefundDataDocument, OrderRefundDocument } from '@core/api/graphql';
import { orderUrl } from '@dashboard/oldSrc/orders/urls';

const getAutomaticallyCalculatedProductsRefundInput = (formData: OrderRefundSubmitData) => ({
  fulfillmentLines: formData.refundedFulfilledProductQuantities
    .filter((line) => line.value !== '0')
    .map((line) => ({
      fulfillmentLineId: line.id,
      quantity: Number(line.value),
    })),
  includeShippingCosts: formData.refundShipmentCosts,
  orderLines: formData.refundedProductQuantities
    .filter((line) => line.value !== '0')
    .map((line) => ({
      orderLineId: line.id,
      quantity: Number(line.value),
    })),
});
const getManuallySetProductsRefundInput = (formData: OrderRefundSubmitData) => ({
  amountToRefund: formData.amount,
  fulfillmentLines: formData.refundedFulfilledProductQuantities
    .filter((line) => line.value !== '0')
    .map((line) => ({
      fulfillmentLineId: line.id,
      quantity: Number(line.value),
    })),
  includeShippingCosts: formData.refundShipmentCosts,
  orderLines: formData.refundedProductQuantities
    .filter((line) => line.value !== '0')
    .map((line) => ({
      orderLineId: line.id,
      quantity: Number(line.value),
    })),
});

interface OrderRefundProps {
  orderId: string;
}

const OrderRefund = () => {
  const router = useRouter();
  const { id: orderId } = router.query;
  const notify = useNotifier();
  const { t } = useTranslation();

  const [{ data, fetching: loading }] = useQuery(OrderRefundDataDocument, {
    displayLoader: true,
    variables: {
      orderId,
    },
  });
  const [refundOrder, refundOrderOpts] = useMutation(OrderRefundDocument, {
    onCompleted: (data) => {
      if (data?.refundOrder?.errors?.length === 0) {
        void router.replace(orderUrl(orderId));
        notify(
          t(
            'dashboard.Rf1Bi',
            'Refunded Items'
            // order refunded success message
          ),
          {
            type: 'success',
          }
        );
      }
    },
  });
  const [refundOrderFulfillmentProducts, refundOrderFulfillmentProductsOpts] = useMutation(
    OrderFulfillmentRefundProductsDocument,
    {
      onCompleted: (data) => {
        if (data?.refundFulfilledProducts?.errors?.length === 0) {
          void router.replace(orderUrl(orderId));
          notify(
            t(
              'dashboard.Rf1Bi',
              'Refunded Items'
              // order refunded success message
            ),
            {
              type: 'success',
            }
          );
        }
      },
    }
  );

  const handleSubmitMiscellaneousRefund = async (formData: OrderRefundSubmitData) => {
    extractMutationErrors(
      refundOrder({
        variables: {
          amount: formData.amount,
          id: orderId,
        },
      })
    );
  };

  const handleSubmitProductsRefund = async (formData: OrderRefundSubmitData) => {
    const input =
      formData.amountCalculationMode === OrderRefundAmountCalculationMode.Automatic
        ? getAutomaticallyCalculatedProductsRefundInput(formData)
        : getManuallySetProductsRefundInput(formData);

    return extractMutationErrors(
      refundOrderFulfillmentProducts({
        variables: {
          input,
          order: orderId,
        },
      })
    );
  };

  const handleSubmit = async (formData: OrderRefundSubmitData) =>
    formData.type === OrderRefundType.Miscellaneous
      ? handleSubmitMiscellaneousRefund(formData)
      : handleSubmitProductsRefund(formData);

  return (
    <OrderRefundPage
      order={data?.order}
      disabled={
        loading || refundOrderOpts.fetching || refundOrderFulfillmentProductsOpts.fetching
      }
      errors={[
        ...(refundOrderOpts.data?.refundOrder.errors || []),
        ...(refundOrderFulfillmentProductsOpts.data?.refundFulfilledProducts.errors || []),
      ]}
      onSubmit={handleSubmit}
    />
  );
};
export default OrderRefund;
