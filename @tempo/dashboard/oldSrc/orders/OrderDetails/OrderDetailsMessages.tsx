import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { OrderErrorCode } from '@tempo/api/generated/constants';
import type {
  InvoiceEmailSendMutation,
  InvoiceRequestMutation,
  OrderAddNoteMutation,
  OrderCancelMutation,
  OrderCaptureMutation,
  OrderDraftCancelMutation,
  OrderDraftFinalizeMutation,
  OrderDraftUpdateMutation,
  OrderFulfillmentApproveMutation,
  OrderFulfillmentCancelMutation,
  OrderFulfillmentUpdateTrackingMutation,
  OrderLineDeleteMutation,
  OrderLinesAddMutation,
  OrderLineUpdateMutation,
  OrderMarkAsPaidMutation,
  OrderShippingMethodUpdateMutation,
  OrderUpdateMutation,
  OrderVoidMutation,
} from '@tempo/api/generated/graphql';
import type { OrderUrlQueryParams } from '@tempo/dashboard/oldSrc/orders/urls';
import { orderUrl } from '@tempo/dashboard/oldSrc/orders/urls';
import getOrderErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/order';
import useDialogActionHandlers from '@tempo/dashboard/oldSrc/utils/handlers/dialogActionHandlers';

interface OrderDetailsMessagesProps {
  children: (props: {
    handleDraftCancel: (data: OrderDraftCancelMutation) => void;
    handleDraftFinalize: (data: OrderDraftFinalizeMutation) => void;
    handleDraftUpdate: (data: OrderDraftUpdateMutation) => void;
    handleNoteAdd: (data: OrderAddNoteMutation) => void;
    handleOrderCancel: (data: OrderCancelMutation) => void;
    handleOrderFulfillmentApprove: (data: OrderFulfillmentApproveMutation) => void;
    handleOrderFulfillmentCancel: (data: OrderFulfillmentCancelMutation) => void;
    handleOrderFulfillmentUpdate: (data: OrderFulfillmentUpdateTrackingMutation) => void;
    handleOrderLinesAdd: (data: OrderLinesAddMutation) => void;
    handleOrderLineDelete: (data: OrderLineDeleteMutation) => void;
    handleOrderLineUpdate: (data: OrderLineUpdateMutation) => void;
    handleOrderMarkAsPaid: (data: OrderMarkAsPaidMutation) => void;
    handleOrderVoid: (data: OrderVoidMutation) => void;
    handlePaymentCapture: (data: OrderCaptureMutation) => void;
    handleShippingMethodUpdate: (data: OrderShippingMethodUpdateMutation) => void;
    handleUpdate: (data: OrderUpdateMutation) => void;
    handleInvoiceGeneratePending: (data: InvoiceRequestMutation) => void;
    handleInvoiceGenerateFinished: (data: InvoiceRequestMutation) => void;
    handleInvoiceSend: (data: InvoiceEmailSendMutation) => void;
  }) => ReactElement;
  id: string;
  params: OrderUrlQueryParams;
}

export const OrderDetailsMessages: FC<OrderDetailsMessagesProps> = ({ children, id, params }) => {
  const router = useRouter();
  const notify = useNotifier();

  const [, closeModal] = useDialogActionHandlers(
    router,
    (params) => orderUrl(id, params),
    params
  );

  const handlePaymentCapture = (data: OrderCaptureMutation) => {
    const errs = data?.captureOrder?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard_RCuN_() ?? 'Payment successfully captured', {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleOrderMarkAsPaid = (data: OrderMarkAsPaidMutation) => {
    const errs = data?.markOrderAsPaid?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard_L_HTg() ?? 'Order marked as paid', {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleOrderCancel = (data: OrderCancelMutation) => {
    const errs = data?.cancelOrder?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard__Es_H() ?? 'Order successfully cancelled', {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleDraftCancel = (data: OrderDraftCancelMutation) => {
    const errs = data?.deleteOrderDraft?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard__Es_H() ?? 'Order successfully cancelled', {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleOrderVoid = (data: OrderVoidMutation) => {
    const errs = data?.voidOrder?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard___bp_() ?? 'Order payment successfully voided', {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleNoteAdd = (data: OrderAddNoteMutation) => {
    const errs = data?.addNoteToOrder?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard_mPicj() ?? 'Note successfully added', {
        type: 'success',
      });
    }
  };
  const handleUpdate = (data: OrderUpdateMutation) => {
    const errs = data?.updateOrder?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard__fPVo() ?? 'Order successfully updated', {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleDraftUpdate = (data: OrderDraftUpdateMutation) => {
    const errs = data?.updateDraftOrder?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard__fPVo() ?? 'Order successfully updated', {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleShippingMethodUpdate = (data: OrderShippingMethodUpdateMutation) => {
    const errs = data?.updateOrderShipping?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard_U_GRy() ?? 'Shipping method successfully updated', {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleOrderLineDelete = (data: OrderLineDeleteMutation) => {
    const errs = data?.deleteOrderLine?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard_OtpHt() ?? 'Order line deleted', {
        type: 'success',
      });
    }
  };
  const handleOrderLinesAdd = (data: OrderLinesAddMutation) => {
    const errs = data?.createOrderLines?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard_lCkMT() ?? 'Order line added', {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleOrderLineUpdate = (data: OrderLineUpdateMutation) => {
    const errs = data?.updateOrderLine?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard_n_bE_() ?? 'Order line updated', {
        type: 'success',
      });
    } else {
      errs.forEach((error) =>
        notify(getOrderErrorMessage(error, t), {
          type: 'error',
        })
      );
    }
  };
  const handleOrderFulfillmentApprove = (data: OrderFulfillmentApproveMutation) => {
    const errs = data?.approveFulfillment?.errors;
    if (errs?.length === 0) {
      notify(m._sX_yS() ?? 'Fulfillment successfully approved', {
        type: 'success',
      });
      closeModal();
    } else {
      if (!errs.every((err) => err.code === OrderErrorCode.InsufficientStock)) {
        handleNestedMutationErrors({ data, notify });
      }
    }
  };
  const handleOrderFulfillmentCancel = (data: OrderFulfillmentCancelMutation) => {
    const errs = data?.cancelFulfillment?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard_Mpv_v() ?? 'Fulfillment successfully cancelled', {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleOrderFulfillmentUpdate = (data: OrderFulfillmentUpdateTrackingMutation) => {
    const errs = data?.updateFulfillmentTracking?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard_ZmloB() ?? 'Fulfillment successfully updated', {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleDraftFinalize = (data: OrderDraftFinalizeMutation) => {
    const errs = data?.completeOrderDraft?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard__gbXr() ?? 'Draft order successfully finalized', {
        type: 'success',
      });
    }
  };
  const handleInvoiceGeneratePending = (data: InvoiceRequestMutation) => {
    const errs = data?.requestInvoice?.errors;
    if (errs?.length === 0) {
      notify(
        t(
          'dashboard_D5x+V',
          "We're generating the invoice you requested. Please wait a couple of moments"
        ),
        {
          title: m.dashboard_KJqcq() ?? 'Invoice is Generating',
        }
      );
      closeModal();
    }
  };
  const handleInvoiceGenerateFinished = (data: InvoiceRequestMutation) => {
    const errs = data?.requestInvoice?.errors;
    if (errs?.length === 0) {
      notify(
        t(
          'dashboard_invoiceGenerateFinishedText',
          'Requested Invoice was generated. It was added to the top of the invoice list on this view. Enjoy!'
        ),
        {
          type: 'success',

          title: m.dashboard_invoiceGenerateFinishedTitle() ?? 'Invoice Generated',
        }
      );
      closeModal();
    }
  };
  const handleInvoiceSend = (data: InvoiceEmailSendMutation) => {
    const errs = data?.sendInvoiceNotification?.errors;
    if (errs?.length === 0) {
      notify(m.dashboard_u__NZ() ?? 'Invoice email sent', {});
      closeModal();
    }
  };

  return children({
    handleDraftCancel,
    handleDraftFinalize,
    handleDraftUpdate,
    handleInvoiceGenerateFinished,
    handleInvoiceGeneratePending,
    handleInvoiceSend,
    handleNoteAdd,
    handleOrderCancel,
    handleOrderFulfillmentApprove,
    handleOrderFulfillmentCancel,
    handleOrderFulfillmentUpdate,
    handleOrderLineDelete,
    handleOrderLineUpdate,
    handleOrderLinesAdd,
    handleOrderMarkAsPaid,
    handleOrderVoid,
    handlePaymentCapture,
    handleShippingMethodUpdate,
    handleUpdate,
  });
};
