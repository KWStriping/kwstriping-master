import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import Form from '@dashboard/components/forms/Form';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { OrderErrorFragment } from '@core/api/graphql';
import getOrderErrorMessage from '@dashboard/oldSrc/utils/errors/order';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { FC } from 'react';

export interface OrderFulfillmentAcceptDialogFormData {
  notifyCustomer: boolean;
}

export interface OrderFulfillmentAcceptDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  onClose(): void;
  onConfirm(data: OrderFulfillmentAcceptDialogFormData): void;
}

const OrderFulfillmentAcceptDialog: FC<OrderFulfillmentAcceptDialogProps> = (props) => {
  const { confirmButtonState, errors, open, onConfirm, onClose } = props;

  const { t } = useTranslation();

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form initial={{ notifyCustomer: true }} onSubmit={onConfirm}>
        {({ change, data, submit }) => (
          <>
            <DialogTitle>{t('dashboard.title', 'Approve this fulfillment')}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {t('dashboard.description', 'Are you sure you want to approve this fulfillment?')}
              </DialogContentText>
              <ControlledCheckbox
                data-test-id="notify-customer"
                name={'notifyCustomer' as keyof OrderFulfillmentAcceptDialogFormData}
                label={t('dashboard.otifyCustomer', 'Send shipment details to customer')}
                checked={data?.notifyCustomer}
                onChange={change}
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
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>{t('dashboard.cancel', 'Cancel')}</Button>
              <ConfirmButton
                data-test="submit"
                transitionState={confirmButtonState}
                onClick={submit}
              >
                {t('dashboard.approve', 'Approve')}
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};
OrderFulfillmentAcceptDialog.displayName = 'OrderFulfillmentAcceptDialog';
export default OrderFulfillmentAcceptDialog;
