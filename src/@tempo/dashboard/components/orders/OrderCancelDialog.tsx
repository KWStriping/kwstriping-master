import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { OrderErrorFragment } from '@tempo/api/generated/graphql';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { FC } from 'react';
import getOrderErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/order';
import useModalDialogErrors from '@tempo/dashboard/hooks/useModalDialogErrors';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';

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

  const errors = useModalDialogErrors(apiErrors, open);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm">
      <DialogTitle>
        <>
          {/* dialog header */}

          {m.dashboard_RXpBm() ?? 'Cancel Order'}
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
          {m.dashboard_ccept() ?? 'Accept'}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
OrderCancelDialog.displayName = 'OrderCancelDialog';
export default OrderCancelDialog;
