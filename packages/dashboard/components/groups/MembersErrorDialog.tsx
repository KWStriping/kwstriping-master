import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';

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
      variant="info"
    >
      <DialogContentText>
        <>
          {t(
            'dashboard./o4Ex',
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
