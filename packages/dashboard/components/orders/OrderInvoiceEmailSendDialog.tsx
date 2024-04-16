import { Trans, useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type { InvoiceErrorFragment, InvoiceFragment } from '@core/api/graphql';
import type { DialogProps } from '@dashboard/oldSrc/types';
import getInvoiceErrorMessage from '@dashboard/oldSrc/utils/errors/invoice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { FC } from 'react';

export interface OrderInvoiceEmailSendDialogProps extends DialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: InvoiceErrorFragment[];
  invoice: Maybe<InvoiceFragment>;
  onSend: () => void;
}

const OrderInvoiceEmailSendDialog: FC<OrderInvoiceEmailSendDialogProps> = ({
  confirmButtonState,
  errors,
  open,
  invoice,
  onClose,
  onSend,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle>
        {/* dialog header */}

        {t('dashboard.JT4v2', 'Send Invoice')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Trans
            id="MPfyne"
            defaultMessage="Are you sure you want to send this invoice: {invoiceNumber} to the customer?"
            values={{
              invoiceNumber: <strong>{invoice?.number}</strong>,
            }}
          />
        </DialogContentText>
        {!!errors?.length && (
          <>
            <FormSpacer />
            {errors.map((err, idx) => (
              <DialogContentText key={idx} color="error">
                {getInvoiceErrorMessage(err, t)}
              </DialogContentText>
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <BackButton onClick={onClose} />
        <ConfirmButton transitionState={confirmButtonState} onClick={onSend}>
          {t('dashboard.end', 'Send')}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
OrderInvoiceEmailSendDialog.displayName = 'OrderInvoiceEmailSendDialog';
export default OrderInvoiceEmailSendDialog;
