import { Trans, useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';

export interface AttributeUnassignDialogProps {
  title: string;
  attributeName: string;
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  itemTypeName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const AttributeUnassignDialog: FC<AttributeUnassignDialogProps> = ({
  title,
  attributeName,
  confirmButtonState,
  open,
  itemTypeName,
  onClose,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      confirmButtonLabel={t('dashboard.onfirmBtn', 'Unassign and save')}
    >
      <DialogContentText>
        <Trans
          t={t}
          i18nKey={'content'}
          attributeName={<strong>{attributeName}</strong>}
          itemTypeName={<strong>{itemTypeName}</strong>}
        >
          {'Are you sure you want to unassign {{attributeName}} from {{itemTypeName}}?'}
        </Trans>
      </DialogContentText>
    </ActionDialog>
  );
};
AttributeUnassignDialog.displayName = 'AttributeUnassignDialog';
export default AttributeUnassignDialog;
