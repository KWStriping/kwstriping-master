import { useShopSettings } from '@core/ui';
import type { PartialMutationProviderOutput } from '@core/urql/types';
import { getById } from '@core/utils';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import OrderAddressFields from '@dashboard/components/orders/OrderAddressFields';
import OrderCancelDialog from '@dashboard/components/orders/OrderCancelDialog';
import OrderCannotCancelOrderDialog from '@dashboard/components/orders/OrderCannotCancelOrderDialog';
import OrderFulfillmentApproveDialog from '@dashboard/components/orders/OrderFulfillmentApproveDialog';
import OrderFulfillmentCancelDialog from '@dashboard/components/orders/OrderFulfillmentCancelDialog';
import OrderFulfillmentTrackingDialog from '@dashboard/components/orders/OrderFulfillmentTrackingDialog';
import OrderFulfillStockExceededDialog from '@dashboard/components/orders/OrderFulfillStockExceededDialog';
import OrderInvoiceEmailSendDialog from '@dashboard/components/orders/OrderInvoiceEmailSendDialog';
import OrderMarkAsPaidDialog from '@dashboard/components/orders/OrderMarkAsPaidDialog';
import OrderPaymentDialog from '@dashboard/components/orders/OrderPaymentDialog';
import OrderPaymentVoidDialog from '@dashboard/components/orders/OrderPaymentVoidDialog';
import { FulfillmentStatus } from '@core/api/constants';

import type {
  FulfillmentFragment,
  OrderFulfillmentApproveMutation,
  OrderFulfillmentApproveMutationVariables,
  OrderDetailsFragment,
} from '@core/api/graphql';
import type { OrderUrlQueryParams } from '@dashboard/oldSrc/orders/urls';
import { transformFulfillmentLinesToStockFormsetData } from '@dashboard/oldSrc/orders/utils/data';

interface OrderNormalDetailsProps {
  id: string;
  order: Maybe<OrderDetailsFragment>;
  params: OrderUrlQueryParams;
  approveFulfillment: PartialMutationProviderOutput<
    OrderFulfillmentApproveMutation,
    OrderFulfillmentApproveMutationVariables
  >;
  openModal: unknown;
  closeModal: unknown;
}
interface ApprovalState {
  fulfillment: FulfillmentFragment;
  notifyCustomer: boolean;
}

export const OrderNormalDetails: FC<OrderNormalDetailsProps> = ({
  id,
  params,
  order,
  openModal,
  closeModal,
}) => {
  const shop = useShopSettings();
  const router = useRouter();

  return (
    <>
      <OrderCannotCancelOrderDialog
        onClose={closeModal}
        open={
          params.action === 'cancel' &&
          order?.fulfillments.some(
            (fulfillment) => fulfillment.status === FulfillmentStatus.Fulfilled
          )
        }
      />
      <OrderCancelDialog
        confirmButtonState={cancelOrder.opts.status}
        errors={cancelOrder.opts.data?.cancelOrder.errors || []}
        number={order?.number}
        open={params.action === 'cancel'}
        onClose={closeModal}
        onSubmit={() =>
          cancelOrder.mutate({
            id,
          })
        }
      />
      <OrderMarkAsPaidDialog
        confirmButtonState={orderPaymentMarkAsPaid.opts.status}
        errors={orderPaymentMarkAsPaid.opts.data?.markOrderAsPaid.errors || []}
        onClose={closeModal}
        onConfirm={() =>
          orderPaymentMarkAsPaid.mutate({
            id,
            transactionReference,
          })
        }
        open={params.action === 'mark-paid'}
        transactionReference={transactionReference}
        handleTransactionReference={({ target }) => setTransactionReference(target.value)}
      />
      <OrderPaymentVoidDialog
        confirmButtonState={voidOrder.opts.status}
        errors={voidOrder.opts.data?.voidOrder.errors || []}
        open={params.action === 'void'}
        onClose={closeModal}
        onConfirm={() => voidOrder.mutate({ id })}
      />
      <OrderPaymentDialog
        confirmButtonState={orderPaymentCapture.opts.status}
        errors={orderPaymentCapture.opts.data?.captureOrder?.errors || []}
        initial={order?.total.gross.amount}
        open={params.action === 'capture'}
        onClose={closeModal}
        onSubmit={(variables) =>
          orderPaymentCapture.mutate({
            ...variables,
            id,
          })
        }
      />
      <OrderFulfillmentApproveDialog
        confirmButtonState={approveFulfillment.opts.status}
        errors={approveFulfillment.opts.data?.approveFulfillment?.errors || []}
        open={params.action === 'approve-fulfillment'}
        onConfirm={({ notifyCustomer }) => {
          setCurrentApproval({
            fulfillment: order?.fulfillments.find(getById(params.id)),
            notifyCustomer,
          });
          return approveFulfillment.mutate({
            id: params.id,
            notifyCustomer,
          });
        }}
        onClose={closeModal}
      />
      <OrderFulfillStockExceededDialog
        lines={currentApproval?.fulfillment.lines}
        formsetData={transformFulfillmentLinesToStockFormsetData(
          currentApproval?.fulfillment.lines,
          currentApproval?.fulfillment.warehouse
        )}
        open={stockExceeded}
        onClose={() => setStockExceeded(false)}
        confirmButtonState="default"
        onSubmit={() => {
          setStockExceeded(false);
          return approveFulfillment.mutate({
            id: params.id,
            notifyCustomer: currentApproval?.notifyCustomer,
            allowStockToBeExceeded: true,
          });
        }}
      />
      <OrderFulfillmentCancelDialog
        confirmButtonState={cancelFulfillment.opts.status}
        errors={cancelFulfillment.opts.data?.cancelFulfillment.errors || []}
        open={params.action === 'cancel-fulfillment'}
        warehouses={warehouses || []}
        onConfirm={(variables) =>
          cancelFulfillment.mutate({
            id: params.id,
            input: variables,
          })
        }
        onClose={closeModal}
      />
      <OrderFulfillmentTrackingDialog
        confirmButtonState={updateFulfillmentTracking.opts.status}
        errors={
          updateFulfillmentTracking.opts.data?.updateFulfillmentTracking.errors || []
        }
        open={params.action === 'edit-fulfillment'}
        trackingNumber={
          data?.order?.fulfillments.find((fulfillment) => fulfillment.id === params.id)
            ?.trackingNumber
        }
        onConfirm={(variables) =>
          updateFulfillmentTracking.mutate({
            id: params.id,
            input: {
              ...variables,
              notifyCustomer: true,
            },
          })
        }
        onClose={closeModal}
      />
      <OrderInvoiceEmailSendDialog
        confirmButtonState={orderInvoiceSend.opts.status}
        errors={orderInvoiceSend.opts.data?.invoiceSendEmail.errors || []}
        open={params.action === 'invoice-send'}
        invoice={order?.invoices?.find((invoice) => invoice.id === params.id)}
        onClose={closeModal}
        onSend={() => orderInvoiceSend.mutate({ id: params.id })}
      />
      <OrderAddressFields
        action={params?.action}
        orderShippingAddress={order?.shippingAddress}
        orderBillingAddress={order?.billingAddress}
        customerAddressesLoading={customerAddressesLoading}
        isDraft={false}
        countries={data?.shop?.countries}
        customer={customerAddresses?.user}
        onClose={closeModal}
        onConfirm={handleCustomerChangeAddresses}
        confirmButtonState={updateOrder.opts.status}
        errors={updateOrder.opts.data?.updateOrder.errors}
      />
    </>
  );
};

export default OrderNormalDetails;
