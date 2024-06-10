import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Form from '@dashboard/components/forms/Form';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { OrderErrorFragment } from '@core/api/graphql';
import useModalDialogErrors from '@dashboard/hooks/useModalDialogErrors';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getOrderErrorMessage from '@dashboard/oldSrc/utils/errors/order';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import type { FC } from 'react';

export interface FormData {
  trackingNumber: string;
}

export interface OrderFulfillmentTrackingDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  trackingNumber: string;
  onClose();
  onConfirm(data: FormData);
}

const OrderFulfillmentTrackingDialog: FC<OrderFulfillmentTrackingDialogProps> = ({
  confirmButtonState,
  errors: apiErrors,
  open,
  trackingNumber,
  onConfirm,
  onClose,
}) => {
  const { t } = useTranslation();
  const errors = useModalDialogErrors(apiErrors, open);

  const formFields = ['trackingNumber'];
  const formErrors = getFormErrors(formFields, errors);

  const initialData: FormData = {
    trackingNumber: trackingNumber || '',
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="xs">
      <Form initial={initialData} onSubmit={onConfirm}>
        {({ change, data, submit }) => (
          <>
            <DialogTitle>
              <>
                {t(
                  '/BJQIq',
                  'Add Tracking Code'
                  // dialog header
                )}
              </>
            </DialogTitle>
            <DialogContent>
              <TextField
                error={!!formErrors.trackingNumber}
                helperText={getOrderErrorMessage(formErrors.trackingNumber, t)}
                label={t('dashboard.T/GAp', 'Tracking number')}
                name="trackingNumber"
                onChange={change}
                value={data?.trackingNumber}
                fullWidth
              />
              {!!errors?.length && (
                <>
                  <FormSpacer />
                  {errors
                    .filter((err) => !formFields.includes(err.field))
                    .map((err, index) => (
                      <DialogContentText color="error" key={index}>
                        {getOrderErrorMessage(err, t)}
                      </DialogContentText>
                    ))}
                </>
              )}
            </DialogContent>
            <DialogActions>
              <BackButton onClick={onClose} />
              <ConfirmButton transitionState={confirmButtonState} onClick={submit}>
                {t('dashboard.onfirm', 'Confirm')}
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};
OrderFulfillmentTrackingDialog.displayName = 'OrderFulfillmentTrackingDialog';
export default OrderFulfillmentTrackingDialog;
