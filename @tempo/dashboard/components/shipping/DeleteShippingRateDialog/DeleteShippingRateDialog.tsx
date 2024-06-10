import * as m from '@paraglide/messages';
import { Trans, useTranslation } from '@tempo/next/i18n';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';
import { getStringOrPlaceholder } from '@tempo/dashboard/oldSrc/misc';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';

export interface DeleteShippingRateDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  name: string;
  onClose: () => void;
  handleConfirm: () => void;
}

export const DeleteShippingRateDialog: FC<DeleteShippingRateDialogProps> = ({
  confirmButtonState,
  onClose,
  handleConfirm,
  name,
  open,
}) => {
  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      onClose={onClose}
      onConfirm={handleConfirm}
      open={open}
      title={
        m.dashboard_NeWAx() ?? 'Delete shipping method'
        // dialog header
      }
      variant="delete"
    >
      <DialogContentText>
        <Trans t={t} i18nKey={'yOaNWB'} values={{ name: getStringOrPlaceholder(name) }}>
          {'Are you sure you want to delete <strong>{{name}}</strong>?'}
        </Trans>
      </DialogContentText>
    </ActionDialog>
  );
};

export default DeleteShippingRateDialog;
