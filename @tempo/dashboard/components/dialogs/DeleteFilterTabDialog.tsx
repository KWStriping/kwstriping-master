import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';

import ActionDialog from './ActionDialog';

export interface DeleteFilterTabDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  tabName: string;
  onClose: () => void;
  onSubmit: () => void;
}

const DeleteFilterTabDialog: FC<DeleteFilterTabDialogProps> = ({
  confirmButtonState,
  onClose,
  onSubmit,
  open,
  tabName,
}) => {
  return (
    <ActionDialog
      open={open}
      confirmButtonState={confirmButtonState}
      onClose={onClose}
      onConfirm={onSubmit}
      title={
        m.dashboard_NfoiJ() ?? 'Delete Search' // custom search delete, dialog header
      }
      variant="delete"
    >
      <DialogContentText>
        <Trans i18nId="UaYJJ8" name={tabName}>
          {'Are you sure you want to delete {{name}} search tab?'}
        </Trans>
      </DialogContentText>
    </ActionDialog>
  );
};
DeleteFilterTabDialog.displayName = 'DeleteFilterTabDialog';
export default DeleteFilterTabDialog;
