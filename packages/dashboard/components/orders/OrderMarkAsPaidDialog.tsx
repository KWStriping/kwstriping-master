import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { OrderErrorFragment } from '@core/api/graphql';
import useModalDialogErrors from '@dashboard/hooks/useModalDialogErrors';
import getOrderErrorMessage from '@dashboard/oldSrc/utils/errors/order';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';

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
  const { t } = useTranslation();
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
        {t('dashboard.fEbeB', "You're going to mark this order as paid.")}
        <br />
        <>
          {t('dashboard.wOx2s', 'Please provide a transaction reference using the input below:')}
        </>
      </DialogContentText>
      <TextField
        fullWidth
        name="transactionReference"
        label={t(
          'dashboard.bVf0Z',
          'Transaction reference'
          // transaction reference
        )}
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
