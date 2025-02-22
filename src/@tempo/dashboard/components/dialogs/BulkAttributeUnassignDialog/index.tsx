import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';

export interface BulkAttributeUnassignDialogProps {
  title: string;
  attributeQuantity: number;
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  itemTypeName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const BulkAttributeUnassignDialog: FC<BulkAttributeUnassignDialogProps> = ({
  title,
  attributeQuantity,
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
          attributeQuantity={<strong>{attributeQuantity}</strong>}
          count={attributeQuantity}
          itemTypeName={<strong>{itemTypeName}</strong>}
        >
          {
            '{count,plural,one{Are you sure you want to unassign this attribute from {{itemTypeName}}?} other{Are you sure you want to unassign {{attributeQuantity}} attributes from {{itemTypeName}}?}}'
          }
        </Trans>
      </DialogContentText>
    </ActionDialog>
  );
};
BulkAttributeUnassignDialog.displayName = 'BulkAttributeUnassignDialog';
export default BulkAttributeUnassignDialog;
