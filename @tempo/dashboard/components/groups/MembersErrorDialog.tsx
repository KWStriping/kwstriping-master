import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';

export interface MembersErrorDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const MembersErrorDialog: FC<MembersErrorDialogProps> = ({
  confirmButtonState,
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
      variant="info"
    >
      <DialogContentText>
        <>
          {t(
            'dashboard_/o4Ex',
            'You are not able to modify this group members. Solve this problem to continue with request.'
            // dialog content
          )}
        </>
      </DialogContentText>
    </ActionDialog>
  );
};
MembersErrorDialog.displayName = 'MembersErrorDialog';
export default MembersErrorDialog;
