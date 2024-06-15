import { useMutation } from '@tempo/api/hooks/useMutation';
import type { PartialMutationProviderOutput } from '@tempo/api/types';
import { getMutationProviderData } from '@tempo/api/utils';
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
} from '@tempo/api/generated/graphql';
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
} from '@tempo/api/generated/graphql';

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
  const voidOrder = useMutation<OrderVoidMutation, OrderVoidMutationVariables>(OrderVoidDocument, {
    onCompleted: onOrderVoid,
  });
  const cancelOrder = useMutation<OrderCancelMutation, OrderCancelMutationVariables>(OrderCancelDocument, {
    onCompleted: onOrderCancel,
  });
  const paymentCapture = useMutation<OrderCaptureMutation, OrderCaptureMutationVariables>(OrderCaptureDocument, {
    onCompleted: onPaymentCapture,
  });
  const addNote = useMutation<OrderAddNoteMutation, OrderAddNoteMutationVariables>(OrderAddNoteDocument, {
    onCompleted: onNoteAdd,
  });
  const update = useMutation<OrderUpdateMutation, OrderUpdateMutationVariables>(OrderUpdateDocument, {
    onCompleted: onUpdate,
  });
  const updateDraft = useMutation<OrderDraftUpdateMutation, OrderDraftUpdateMutationVariables>(OrderDraftUpdateDocument, {
    onCompleted: onDraftUpdate,
  });
  const updateShippingMethod = useMutation<OrderShippingMethodUpdateMutation, OrderShippingMethodUpdateMutationVariables>(OrderShippingMethodUpdateDocument, {
    onCompleted: onShippingMethodUpdate,
  });
  const deleteOrderLine = useMutation<OrderLineDeleteMutation, OrderLineDeleteMutationVariables>(OrderLineDeleteDocument, {
    onCompleted: onOrderLineDelete,
  });
  const addOrderLine = useMutation<OrderLinesAddMutation, OrderLinesAddMutationVariables>(OrderLinesAddDocument, {
    onCompleted: onOrderLinesAdd,
  });
  const updateOrderLine = useMutation<OrderLineUpdateMutation, OrderLineUpdateMutationVariables>(OrderLineUpdateDocument, {
    onCompleted: onOrderLineUpdate,
  });
  const approveFulfillment = useMutation<OrderFulfillmentApproveMutation, OrderFulfillmentApproveMutationVariables>(OrderFulfillmentApproveDocument, {
    onCompleted: onOrderFulfillmentApprove,
    disableErrorHandling: true,
  });
  const cancelFulfillment = useMutation<OrderFulfillmentCancelMutation, OrderFulfillmentCancelMutationVariables>(OrderFulfillmentCancelDocument, {
    onCompleted: onOrderFulfillmentCancel,
  });
  const updateTrackingNumber = useMutation<OrderFulfillmentUpdateTrackingMutation, OrderFulfillmentUpdateTrackingMutationVariables>(OrderFulfillmentUpdateTrackingDocument, {
    onCompleted: onOrderFulfillmentUpdate,
  });
  const finalizeDraft = useMutation<OrderDraftFinalizeMutation, OrderDraftFinalizeMutationVariables>(OrderDraftFinalizeDocument, {
    onCompleted: onDraftFinalize,
  });
  const cancelDraft = useMutation<OrderDraftCancelMutation, OrderDraftCancelMutationVariables>(OrderDraftCancelDocument, {
    onCompleted: onDraftCancel,
  });
  const markAsPaid = useMutation<OrderMarkAsPaidMutation, OrderMarkAsPaidMutationVariables>(OrderMarkAsPaidDocument, {
    onCompleted: onOrderMarkAsPaid,
  });
  const requestInvoice = useMutation<InvoiceRequestMutation, InvoiceRequestMutationVariables>(InvoiceRequestDocument, {
    onCompleted: onInvoiceRequest,
  });
  const invoiceEmailSend = useMutation<InvoiceEmailSendMutation, InvoiceEmailSendMutationVariables>(InvoiceEmailSendDocument, {
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
