import { Trans, useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';

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
  const { t } = useTranslation();

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      variant="delete"
      title={t(
        'dashboard.JbzcP',
        'Cancel Orders'
        // dialog header
      )}
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
