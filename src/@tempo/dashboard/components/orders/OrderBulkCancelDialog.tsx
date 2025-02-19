import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';

export interface OrderBulkCancelDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  numberOfOrders: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const OrderBulkCancelDialog: FC<OrderBulkCancelDialogProps> = ({
  confirmButtonState,
  numberOfOrders,
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      variant="delete"
      title={
        m.dashboard_JbzcP() ?? 'Cancel Orders'
        // dialog header
      }
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <DialogContentText>
        <Trans
          id="i+JSEZ"
          defaultMessage="{count,plural,one{Are you sure you want to cancel this order?} other{Are you sure you want to cancel {displayQuantity} orders?}}"
          values={{
            count: numberOfOrders,
            displayQuantity: <strong>{numberOfOrders}</strong>,
          }}
        />
      </DialogContentText>
    </ActionDialog>
  );
};
OrderBulkCancelDialog.displayName = 'OrderBulkCancelDialog';
export default OrderBulkCancelDialog;
