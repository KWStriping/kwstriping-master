import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { OrderErrorFragment } from '@core/api/graphql';
import getOrderErrorMessage from '@dashboard/oldSrc/utils/errors/order';
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
  const { t } = useTranslation();

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <>
          {/* dialog header */}

          {t('dashboard.szPFx', 'Void Payment')}
        </>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('dashboard.uRfu+', 'Are you sure you want to void this payment?')}
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
          {t('dashboard.onfirm', 'Confirm')}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
OrderPaymentVoidDialog.displayName = 'OrderPaymentVoidDialog';
export default OrderPaymentVoidDialog;
