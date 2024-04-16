import { Trans, useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { OrderErrorFragment } from '@core/api/graphql';
import useModalDialogErrors from '@dashboard/hooks/useModalDialogErrors';
import getOrderErrorMessage from '@dashboard/oldSrc/utils/errors/order';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { FC } from 'react';

export interface OrderCancelDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  number: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const OrderCancelDialog: FC<OrderCancelDialogProps> = (props) => {
  const {
    confirmButtonState,
    errors: apiErrors,
    number: orderNumber,
    open,
    onSubmit,
    onClose,
  } = props;

  const { t } = useTranslation();
  const errors = useModalDialogErrors(apiErrors, open);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm">
      <DialogTitle>
        <>
          {/* dialog header */}

          {t('dashboard.RXpBm', 'Cancel Order')}
        </>
      </DialogTitle>
      <DialogContent>
        <DialogContentText key="cancel">
          <Trans
            id="VSztEE"
            defaultMessage="Cancelling this order will release unfulfilled stocks, so they can be bought by other customers. <b>Order will not be refunded when cancelling order - You need to do it manually.</b> Are you sure you want to cancel this order?"
            values={{
              b: (...chunks) => <b>{chunks}</b>,
              orderNumber,
            }}
          />
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
        <ConfirmButton onClick={onSubmit} transitionState={confirmButtonState} type="submit">
          {t('dashboard.ccept', 'Accept')}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
OrderCancelDialog.displayName = 'OrderCancelDialog';
export default OrderCancelDialog;
