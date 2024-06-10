import * as m from '@paraglide/messages';
import { Trans, useTranslation } from '@tempo/next/i18n';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { OrderErrorFragment } from '@tempo/api/generated/graphql';
import useModalDialogErrors from '@tempo/dashboard/hooks/useModalDialogErrors';
import getOrderErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/order';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';

export interface OrderDraftCancelDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderNumber: string;
}

const OrderDraftCancelDialog: FC<OrderDraftCancelDialogProps> = ({
  confirmButtonState,
  errors: apiErrors,
  onClose,
  onConfirm,
  open,
  orderNumber,
}) => {
  const errors = useModalDialogErrors(apiErrors, open);

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      onClose={onClose}
      onConfirm={onConfirm}
      open={open}
      title={
        m.dashboard_PcoSA() ?? 'Delete Daft Order'
        // dialog header
      }
      variant="delete"
    >
      <DialogContentText key="cancel">
        <Trans
          id="mxtAFx"
          defaultMessage="Are you sure you want to delete draft #{{orderNumber}}?"
          values={{
            orderNumber: <strong>{orderNumber}</strong>,
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
    </ActionDialog>
  );
};
OrderDraftCancelDialog.displayName = 'OrderDraftCancelDialog';
export default OrderDraftCancelDialog;
