import { useMutation } from '@core/urql/hooks/useMutation';
import type { PartialMutationProviderOutput } from '@core/urql/types';
import { getMutationProviderData } from '@core/urql/utils';
import type { FC, ReactNode } from 'react';
import {
  InvoiceEmailSendDocument,
  InvoiceRequestDocument,
  OrderAddNoteDocument,
  OrderCancelDocument,
  OrderCaptureDocument,
  OrderDraftCancelDocument,
  OrderDraftFinalizeDocument,
  OrderDraftUpdateDocument,
  OrderFulfillmentApproveDocument,
  OrderFulfillmentCancelDocument,
  OrderFulfillmentUpdateTrackingDocument,
  OrderLineDeleteDocument,
  OrderLinesAddDocument,
  OrderLineUpdateDocument,
  OrderMarkAsPaidDocument,
  OrderShippingMethodUpdateDocument,
  OrderUpdateDocument,
  OrderVoidDocument,
} from '@core/api/graphql';
import type {
  InvoiceEmailSendMutation,
  InvoiceEmailSendMutationVariables,
  InvoiceRequestMutation,
  InvoiceRequestMutationVariables,
  OrderAddNoteMutation,
  OrderAddNoteMutationVariables,
  OrderCancelMutation,
  OrderCancelMutationVariables,
  OrderCaptureMutation,
  OrderCaptureMutationVariables,
  OrderDraftCancelMutation,
  OrderDraftCancelMutationVariables,
  OrderDraftFinalizeMutation,
  OrderDraftFinalizeMutationVariables,
  OrderDraftUpdateMutation,
  OrderDraftUpdateMutationVariables,
  OrderFulfillmentApproveMutation,
  OrderFulfillmentApproveMutationVariables,
  OrderFulfillmentCancelMutation,
  OrderFulfillmentCancelMutationVariables,
  OrderFulfillmentUpdateTrackingMutation,
  OrderFulfillmentUpdateTrackingMutationVariables,
  OrderLineDeleteMutation,
  OrderLineDeleteMutationVariables,
  OrderLinesAddMutation,
  OrderLinesAddMutationVariables,
  OrderLineUpdateMutation,
  OrderLineUpdateMutationVariables,
  OrderMarkAsPaidMutation,
  OrderMarkAsPaidMutationVariables,
  OrderShippingMethodUpdateMutation,
  OrderShippingMethodUpdateMutationVariables,
  OrderUpdateMutation,
  OrderUpdateMutationVariables,
  OrderVoidMutation,
  OrderVoidMutationVariables,
} from '@core/api/graphql';

interface OrderOperationsProps {
  order: string;
  children: (props: {
    addNoteToOrder: PartialMutationProviderOutput<
      OrderAddNoteMutation,
      OrderAddNoteMutationVariables
    >;
    cancelOrder: PartialMutationProviderOutput<OrderCancelMutation, OrderCancelMutationVariables>;
    approveFulfillment: PartialMutationProviderOutput<
      OrderFulfillmentApproveMutation,
      OrderFulfillmentApproveMutationVariables
    >;
    cancelFulfillment: PartialMutationProviderOutput<
      OrderFulfillmentCancelMutation,
      OrderFulfillmentCancelMutationVariables
    >;
    updateFulfillmentTracking: PartialMutationProviderOutput<
      OrderFulfillmentUpdateTrackingMutation,
      OrderFulfillmentUpdateTrackingMutationVariables
    >;
    orderPaymentCapture: PartialMutationProviderOutput<
      OrderCaptureMutation,
      OrderCaptureMutationVariables
    >;
    orderPaymentMarkAsPaid: PartialMutationProviderOutput<
      OrderMarkAsPaidMutation,
      OrderMarkAsPaidMutationVariables
    >;
    voidOrder: PartialMutationProviderOutput<OrderVoidMutation, OrderVoidMutationVariables>;
    updateOrder: PartialMutationProviderOutput<OrderUpdateMutation, OrderUpdateMutationVariables>;
    orderDraftCancel: PartialMutationProviderOutput<
      OrderDraftCancelMutation,
      OrderDraftCancelMutationVariables
    >;
    orderDraftFinalize: PartialMutationProviderOutput<
      OrderDraftFinalizeMutation,
      OrderDraftFinalizeMutationVariables
    >;
    orderDraftUpdate: PartialMutationProviderOutput<
      OrderDraftUpdateMutation,
      OrderDraftUpdateMutationVariables
    >;
    orderShippingMethodUpdate: PartialMutationProviderOutput<
      OrderShippingMethodUpdateMutation,
      OrderShippingMethodUpdateMutationVariables
    >;
    deleteOrderLine: PartialMutationProviderOutput<
      OrderLineDeleteMutation,
      OrderLineDeleteMutationVariables
    >;
    orderLinesAdd: PartialMutationProviderOutput<
      OrderLinesAddMutation,
      OrderLinesAddMutationVariables
    >;
    updateOrderLine: PartialMutationProviderOutput<
      OrderLineUpdateMutation,
      OrderLineUpdateMutationVariables
    >;
    orderInvoiceRequest: PartialMutationProviderOutput<
      InvoiceRequestMutation,
      InvoiceRequestMutationVariables
    >;
    orderInvoiceSend: PartialMutationProviderOutput<
      InvoiceEmailSendMutation,
      InvoiceEmailSendMutationVariables
    >;
  }) => ReactNode;
  onOrderFulfillmentApprove: (data: OrderFulfillmentApproveMutation) => void;
  onOrderFulfillmentCancel: (data: OrderFulfillmentCancelMutation) => void;
  onOrderFulfillmentUpdate: (data: OrderFulfillmentUpdateTrackingMutation) => void;
  onOrderCancel: (data: OrderCancelMutation) => void;
  onOrderVoid: (data: OrderVoidMutation) => void;
  onOrderMarkAsPaid: (data: OrderMarkAsPaidMutation) => void;
  onNoteAdd: (data: OrderAddNoteMutation) => void;
  onPaymentCapture: (data: OrderCaptureMutation) => void;
  onUpdate: (data: OrderUpdateMutation) => void;
  onDraftCancel: (data: OrderDraftCancelMutation) => void;
  onDraftFinalize: (data: OrderDraftFinalizeMutation) => void;
  onDraftUpdate: (data: OrderDraftUpdateMutation) => void;
  onShippingMethodUpdate: (data: OrderShippingMethodUpdateMutation) => void;
  onOrderLineDelete: (data: OrderLineDeleteMutation) => void;
  onOrderLinesAdd: (data: OrderLinesAddMutation) => void;
  onOrderLineUpdate: (data: OrderLineUpdateMutation) => void;
  onInvoiceRequest: (data: InvoiceRequestMutation) => void;
  onInvoiceSend: (data: InvoiceEmailSendMutation) => void;
}

const OrderOperations: FC<OrderOperationsProps> = ({
  children,
  onDraftUpdate,
  onNoteAdd,
  onOrderCancel,
  onOrderLinesAdd,
  onOrderLineDelete,
  onOrderLineUpdate,
  onOrderVoid,
  onPaymentCapture,
  onShippingMethodUpdate,
  onUpdate,
  onDraftCancel,
  onDraftFinalize,
  onOrderFulfillmentApprove,
  onOrderFulfillmentCancel,
  onOrderFulfillmentUpdate,
  onOrderMarkAsPaid,
  onInvoiceRequest,
  onInvoiceSend,
}) => {
  const voidOrder = useMutation(OrderVoidDocument, {
    onCompleted: onOrderVoid,
  });
  const cancelOrder = useMutation(OrderCancelDocument, {
    onCompleted: onOrderCancel,
  });
  const paymentCapture = useMutation(OrderCaptureDocument, {
    onCompleted: onPaymentCapture,
  });
  const addNote = useMutation(OrderAddNoteDocument, {
    onCompleted: onNoteAdd,
  });
  const update = useMutation(OrderUpdateDocument, {
    onCompleted: onUpdate,
  });
  const updateDraft = useMutation(OrderDraftUpdateDocument, {
    onCompleted: onDraftUpdate,
  });
  const updateShippingMethod = useMutation(OrderShippingMethodUpdateDocument, {
    onCompleted: onShippingMethodUpdate,
  });
  const deleteOrderLine = useMutation(OrderLineDeleteDocument, {
    onCompleted: onOrderLineDelete,
  });
  const addOrderLine = useMutation(OrderLinesAddDocument, {
    onCompleted: onOrderLinesAdd,
  });
  const updateOrderLine = useMutation(OrderLineUpdateDocument, {
    onCompleted: onOrderLineUpdate,
  });
  const approveFulfillment = useMutation(OrderFulfillmentApproveDocument, {
    onCompleted: onOrderFulfillmentApprove,
    disableErrorHandling: true,
  });
  const cancelFulfillment = useMutation(OrderFulfillmentCancelDocument, {
    onCompleted: onOrderFulfillmentCancel,
  });
  const updateTrackingNumber = useMutation(OrderFulfillmentUpdateTrackingDocument, {
    onCompleted: onOrderFulfillmentUpdate,
  });
  const finalizeDraft = useMutation(OrderDraftFinalizeDocument, {
    onCompleted: onDraftFinalize,
  });
  const cancelDraft = useMutation(OrderDraftCancelDocument, {
    onCompleted: onDraftCancel,
  });
  const markAsPaid = useMutation(OrderMarkAsPaidDocument, {
    onCompleted: onOrderMarkAsPaid,
  });
  const requestInvoice = useMutation(InvoiceRequestDocument, {
    onCompleted: onInvoiceRequest,
  });
  const invoiceEmailSend = useMutation(InvoiceEmailSendDocument, {
    onCompleted: onInvoiceSend,
  });

  return (
    <>
      {children({
        addNoteToOrder: getMutationProviderData(...addNote),
        cancelOrder: getMutationProviderData(...cancelOrder),
        orderDraftCancel: getMutationProviderData(...cancelDraft),
        orderDraftFinalize: getMutationProviderData(...finalizeDraft),
        orderDraftUpdate: getMutationProviderData(...updateDraft),
        approveFulfillment: getMutationProviderData(...approveFulfillment),
        cancelFulfillment: getMutationProviderData(...cancelFulfillment),
        updateFulfillmentTracking: getMutationProviderData(...updateTrackingNumber),
        orderInvoiceRequest: getMutationProviderData(...requestInvoice),
        orderInvoiceSend: getMutationProviderData(...invoiceEmailSend),
        deleteOrderLine: getMutationProviderData(...deleteOrderLine),
        updateOrderLine: getMutationProviderData(...updateOrderLine),
        orderLinesAdd: getMutationProviderData(...addOrderLine),
        orderPaymentCapture: getMutationProviderData(...paymentCapture),
        orderPaymentMarkAsPaid: getMutationProviderData(...markAsPaid),
        orderShippingMethodUpdate: getMutationProviderData(...updateShippingMethod),
        updateOrder: getMutationProviderData(...update),
        voidOrder: getMutationProviderData(...voidOrder),
      })}
    </>
  );
};
export default OrderOperations;
