import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type { OrderErrorFragment } from '@tempo/api/generated/graphql';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import useModalDialogErrors from '@tempo/dashboard/hooks/useModalDialogErrors';
import getOrderErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/order';

export interface OrderMarkAsPaidDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  transactionReference: string;
  onClose: () => void;
  onConfirm: () => void;
  handleTransactionReference: (e: ChangeEvent<HTMLInputElement>) => void;
}

const OrderMarkAsPaidDialog: FC<OrderMarkAsPaidDialogProps> = ({
  confirmButtonState,
  errors: apiErrors,
  handleTransactionReference,
  onClose,
  onConfirm,
  open,
  transactionReference,
}) => {
  const errors = useModalDialogErrors(apiErrors, open);

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      title={t(
        '+B25o/',
        'Mark Order as Paid'
        // dialog header
      )}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <DialogContentText>
        {m.dashboard_fEbeB() ?? "You're going to mark this order as paid."}
        <br />
        <>
          {m.dashboard_wOx_s() ?? 'Please provide a transaction reference using the input below:'}
        </>
      </DialogContentText>
      <TextField
        fullWidth
        name="transactionReference"
        label={
          m.dashboard_bVf_Z() ?? 'Transaction reference'
          // transaction reference
        }
        value={transactionReference}
        onChange={handleTransactionReference}
      />
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
    </ActionDialog>
  );
};
OrderMarkAsPaidDialog.displayName = 'OrderMarkAsPaidDialog';
export default OrderMarkAsPaidDialog;
