import { Trans, useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';

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
