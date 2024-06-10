import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import Form from '@tempo/dashboard/components/forms/Form';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { OrderErrorFragment } from '@tempo/api/generated/graphql';
import getOrderErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/order';
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

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <Form initial={{ notifyCustomer: true }} onSubmit={onConfirm}>
        {({ change, data, submit }) => (
          <>
            <DialogTitle>{m.dashboard_title() ?? 'Approve this fulfillment'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {m.dashboard_description() ??
                  'Are you sure you want to approve this fulfillment?'}
              </DialogContentText>
              <ControlledCheckbox
                data-test-id="notify-customer"
                name={'notifyCustomer' as keyof OrderFulfillmentAcceptDialogFormData}
                label={m.dashboard_otifyCustomer() ?? 'Send shipment details to customer'}
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
              <Button onClick={onClose}>{m.dashboard_cancel() ?? 'Cancel'}</Button>
              <ConfirmButton
                data-test="submit"
                transitionState={confirmButtonState}
                onClick={submit}
              >
                {m.dashboard_approve() ?? 'Approve'}
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
