import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';

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
  return (
    <ActionDialog
      open={open}
      confirmButtonState={confirmButtonState}
      onClose={onClose}
      onConfirm={onConfirm}
      title={
        m.dashboard_T_MYM() ?? 'Unassign users'
        // dialog title
      }
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
