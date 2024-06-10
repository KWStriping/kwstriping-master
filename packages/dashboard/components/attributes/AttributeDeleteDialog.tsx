import { Trans, useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';

export interface AttributeDeleteDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  name: string;
}

const AttributeDeleteDialog: FC<AttributeDeleteDialogProps> = ({
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
      title={t(
        'dashboard.I2Xwp',
        'Delete attribute'
        // dialog title
      )}
    >
      <DialogContentText>
        <Trans t={t} i18nKey={'h1rPPg'} attributeName={name}>
          {'Are you sure you want to delete <strong>{{attributeName}}</strong>?'}
        </Trans>
        <Trans t={t} i18nKey={'h1rPPg'} attributeName={`<strong>${name}</strong>}`}>
          {'Are you sure you want to delete {{attributeName}}?'}
        </Trans>
      </DialogContentText>
    </ActionDialog>
  );
};

AttributeDeleteDialog.displayName = 'AttributeDeleteDialog';
export default AttributeDeleteDialog;
