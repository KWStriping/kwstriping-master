import { Trans, useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import { GroupErrorCode } from '@core/api/constants';
import type { GroupErrorFragment } from '@core/api/graphql';
import getGroupErrorMessage from '@dashboard/oldSrc/utils/errors/groups';

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
  const { t } = useTranslation();

  let errorMessage;
  if (error?.code === GroupErrorCode.OutOfScopePermission) {
    errorMessage = t(
      'dashboard.22NIZ',
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
        'dashboard.6+p8a',
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
