import { Trans, useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';

export interface AttributeBulkDeleteDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  quantity: number;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const AttributeBulkDeleteDialog: FC<AttributeBulkDeleteDialogProps> = ({
  confirmButtonState,
  quantity,
  onClose,
  onConfirm,
  open,
}) => {
  const { t } = useTranslation();

  return (
    <ActionDialog
      open={open}
      confirmButtonState={confirmButtonState}
      onClose={onClose}
      onConfirm={onConfirm}
      title={t(
        'dashboard.Kf4LU',
        'Delete attributes'
        // dialog title
      )}
      variant="delete"
    >
      <DialogContentText>
        <Trans
          t={t}
          i18nKey={'lG/MDw'}
          count={quantity}
          displayQuantity={<strong>{quantity}</strong>}
        >
          {
            '{count,plural,one{Are you sure you want to delete this attribute?} other{Are you sure you want to delete {displayQuantity} attributes?}}'
          }
        </Trans>
      </DialogContentText>
    </ActionDialog>
  );
};
AttributeBulkDeleteDialog.displayName = 'AttributeBulkDeleteDialog';
export default AttributeBulkDeleteDialog;
