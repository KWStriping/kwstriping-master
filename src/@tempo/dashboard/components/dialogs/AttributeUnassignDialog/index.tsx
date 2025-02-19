import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';

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
  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      confirmButtonLabel={m.dashboard_onfirmBtn() ?? 'Unassign and save'}
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
