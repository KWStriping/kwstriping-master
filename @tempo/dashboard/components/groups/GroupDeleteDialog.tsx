import { Trans, useTranslation } from '@tempo/next/i18n';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';
import { GroupErrorCode } from '@tempo/api/generated/constants';
import type { GroupErrorFragment } from '@tempo/api/generated/graphql';
import getGroupErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/groups';

export interface PermissionDeleteDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  error?: Maybe<GroupErrorFragment>;
  name: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
}

const GroupDeleteDialog: FC<PermissionDeleteDialogProps> = ({
  confirmButtonState,
  error,
  name,
  onClose,
  onConfirm,
  open,
}) => {
  let errorMessage;
  if (error?.code === GroupErrorCode.OutOfScopePermission) {
    errorMessage = t(
      'dashboard_22NIZ',
      "Cant's delete group which is out of your permission scope"
      // deletion error message
    );
  } else if (error) {
    errorMessage = getGroupErrorMessage(error, t);
  }

  return (
    <ActionDialog
      open={open}
      confirmButtonState={confirmButtonState}
      onClose={onClose}
      onConfirm={onConfirm}
      title={t(
        'dashboard_6+p8a',
        'Delete permission group'
        // dialog title
      )}
      variant="delete"
    >
      <DialogContentText>
        <Trans t={t} i18nKey={'sR0urA'} values={{ name: `<strong>${name}</strong>}` }}>
          {'Are you sure you want to delete {{name}}?'}
        </Trans>
      </DialogContentText>
      {!!errorMessage && <Typography color="error">{errorMessage}</Typography>}
    </ActionDialog>
  );
};
GroupDeleteDialog.displayName = 'GroupDeleteDialog';
export default GroupDeleteDialog;
