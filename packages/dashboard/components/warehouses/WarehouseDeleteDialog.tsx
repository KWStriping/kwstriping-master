import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DialogContentText from '@mui/material/DialogContentText';
import { Trans, useTranslation } from '@core/i18n';
import type { FC } from 'react';

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
  const { t } = useTranslation();

  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      confirmButtonState={confirmButtonState}
      onConfirm={onConfirm}
      variant="delete"
      title={t('dashboard.deleteWarehouseDialogTitle', 'Delete warehouse')}
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
