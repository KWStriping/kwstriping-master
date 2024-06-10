import { Trans, useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { OrderErrorFragment } from '@core/api/graphql';
import useModalDialogErrors from '@dashboard/hooks/useModalDialogErrors';
import getOrderErrorMessage from '@dashboard/oldSrc/utils/errors/order';
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
  const { t } = useTranslation();
  const errors = useModalDialogErrors(apiErrors, open);

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      onClose={onClose}
      onConfirm={onConfirm}
      open={open}
      title={t(
        'dashboard.PcoSA',
        'Delete Daft Order'
        // dialog header
      )}
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
