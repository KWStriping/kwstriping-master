import { Trans, useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';

export interface UnassignMembersDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  quantity: number;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const UnassignMembersDialog: FC<UnassignMembersDialogProps> = ({
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
        'dashboard.T5MYM',
        'Unassign users'
        // dialog title
      )}
      variant="delete"
    >
      <DialogContentText>
        <Trans
          t={t}
          i18nKey={'XGBsoK'}
          count={quantity}
          displayQuantity={<strong>{quantity}</strong>}
        >
          {
            'Are you sure you want to unassign {count,plural,one{this member} other{{displayQuantity} members}}?'
          }
        </Trans>
      </DialogContentText>
    </ActionDialog>
  );
};
UnassignMembersDialog.displayName = 'UnassignMembersDialog';
export default UnassignMembersDialog;
