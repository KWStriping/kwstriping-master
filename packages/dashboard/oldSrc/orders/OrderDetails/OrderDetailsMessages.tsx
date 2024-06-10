import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { OrderErrorCode } from '@core/api/constants';
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
} from '@core/api/graphql';
import type { OrderUrlQueryParams } from '@dashboard/oldSrc/orders/urls';
import { orderUrl } from '@dashboard/oldSrc/orders/urls';
import getOrderErrorMessage from '@dashboard/oldSrc/utils/errors/order';
import useDialogActionHandlers from '@dashboard/oldSrc/utils/handlers/dialogActionHandlers';

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
  const { t } = useTranslation();

  const [, closeModal] = useDialogActionHandlers(
    router,
    (params) => orderUrl(id, params),
    params
  );

  const handlePaymentCapture = (data: OrderCaptureMutation) => {
    const errs = data?.captureOrder?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.RCuN3', 'Payment successfully captured'), {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleOrderMarkAsPaid = (data: OrderMarkAsPaidMutation) => {
    const errs = data?.markOrderAsPaid?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.L1HTg', 'Order marked as paid'), {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleOrderCancel = (data: OrderCancelMutation) => {
    const errs = data?.cancelOrder?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard./Es0H', 'Order successfully cancelled'), {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleDraftCancel = (data: OrderDraftCancelMutation) => {
    const errs = data?.deleteOrderDraft?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard./Es0H', 'Order successfully cancelled'), {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleOrderVoid = (data: OrderVoidMutation) => {
    const errs = data?.voidOrder?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.87bp7', 'Order payment successfully voided'), {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleNoteAdd = (data: OrderAddNoteMutation) => {
    const errs = data?.addNoteToOrder?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.mPicj', 'Note successfully added'), {
        type: 'success',
      });
    }
  };
  const handleUpdate = (data: OrderUpdateMutation) => {
    const errs = data?.updateOrder?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.2fPVo', 'Order successfully updated'), {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleDraftUpdate = (data: OrderDraftUpdateMutation) => {
    const errs = data?.updateDraftOrder?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.2fPVo', 'Order successfully updated'), {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleShippingMethodUpdate = (data: OrderShippingMethodUpdateMutation) => {
    const errs = data?.updateOrderShipping?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.U8GRy', 'Shipping method successfully updated'), {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleOrderLineDelete = (data: OrderLineDeleteMutation) => {
    const errs = data?.deleteOrderLine?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.OtpHt', 'Order line deleted'), {
        type: 'success',
      });
    }
  };
  const handleOrderLinesAdd = (data: OrderLinesAddMutation) => {
    const errs = data?.createOrderLines?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.lCkMT', 'Order line added'), {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleOrderLineUpdate = (data: OrderLineUpdateMutation) => {
    const errs = data?.updateOrderLine?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.n3bE0', 'Order line updated'), {
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
      notify(t('+sX7yS', 'Fulfillment successfully approved'), {
        type: 'success',
      });
      closeModal();
    } else {
      if (!errs.every((err) => err.code === OrderErrorCode.InsufficientStock)) {
        handleNestedMutationErrors({ data, t, notify });
      }
    }
  };
  const handleOrderFulfillmentCancel = (data: OrderFulfillmentCancelMutation) => {
    const errs = data?.cancelFulfillment?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.Mpv1v', 'Fulfillment successfully cancelled'), {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleOrderFulfillmentUpdate = (data: OrderFulfillmentUpdateTrackingMutation) => {
    const errs = data?.updateFulfillmentTracking?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.ZmloB', 'Fulfillment successfully updated'), {
        type: 'success',
      });
      closeModal();
    }
  };
  const handleDraftFinalize = (data: OrderDraftFinalizeMutation) => {
    const errs = data?.completeOrderDraft?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.4gbXr', 'Draft order successfully finalized'), {
        type: 'success',
      });
    }
  };
  const handleInvoiceGeneratePending = (data: InvoiceRequestMutation) => {
    const errs = data?.requestInvoice?.errors;
    if (errs?.length === 0) {
      notify(
        t(
          'dashboard.D5x+V',
          "We're generating the invoice you requested. Please wait a couple of moments"
        ),
        {
          title: t('dashboard.KJqcq', 'Invoice is Generating'),
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
          'dashboard.invoiceGenerateFinishedText',
          'Requested Invoice was generated. It was added to the top of the invoice list on this view. Enjoy!'
        ),
        {
          type: 'success',

          title: t('dashboard.invoiceGenerateFinishedTitle', 'Invoice Generated'),
        }
      );
      closeModal();
    }
  };
  const handleInvoiceSend = (data: InvoiceEmailSendMutation) => {
    const errs = data?.sendInvoiceNotification?.errors;
    if (errs?.length === 0) {
      notify(t('dashboard.u+4NZ', 'Invoice email sent'), {});
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
