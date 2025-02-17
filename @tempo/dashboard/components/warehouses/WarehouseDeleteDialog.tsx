import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import DialogContentText from '@mui/material/DialogContentText';
import { Trans } from '@tempo/next/i18n';
import type { FC } from 'react';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';

export interface WarehouseDeleteDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  name: string;
}

const WarehouseDeleteDialog: FC<WarehouseDeleteDialogProps> = ({
  name,
  confirmButtonState,
  onClose,
  onConfirm,
  open,
}) => {
  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      confirmButtonState={confirmButtonState}
      onConfirm={onConfirm}
      variant="delete"
      title={m.dashboard_deleteWarehouseDialogTitle() ?? 'Delete warehouse'}
    >
      <DialogContentText>
        <Trans t={t} i18nKey={'DTL7sE'} values={{ warehouseName: `<strong>${name}</strong>` }}>
          {'Are you sure you want to delete {{warehouseName}}?'}
        </Trans>
      </DialogContentText>
    </ActionDialog>
  );
};

WarehouseDeleteDialog.displayName = 'WarehouseDeleteDialog';
export default WarehouseDeleteDialog;
