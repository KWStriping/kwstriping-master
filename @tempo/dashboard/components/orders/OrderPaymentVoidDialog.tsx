import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { OrderErrorFragment } from '@tempo/api/generated/graphql';
import getOrderErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/order';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { FC } from 'react';

export interface OrderPaymentVoidDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const OrderPaymentVoidDialog: FC<OrderPaymentVoidDialogProps> = ({
  confirmButtonState,
  errors,
  open,
  onConfirm,
  onClose,
}) => {

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <>
          {/* dialog header */}

          {m.dashboard_szPFx() ?? 'Void Payment'}
        </>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {m.dashboard_uRfu+ ?? 'Are you sure you want to void this payment?'}
        </DialogContentText>
        {!!errors?.length && (
          <>
            <FormSpacer />
            {errors.map((err, index) => (
              <DialogContentText color="error" key={index}>
                {getOrderErrorMessage(err, t)}
              </DialogContentText>
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <BackButton onClick={onClose} />
        <ConfirmButton transitionState={confirmButtonState} onClick={onConfirm}>
          {m.dashboard_onfirm() ?? 'Confirm'}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
OrderPaymentVoidDialog.displayName = 'OrderPaymentVoidDialog';
export default OrderPaymentVoidDialog;
