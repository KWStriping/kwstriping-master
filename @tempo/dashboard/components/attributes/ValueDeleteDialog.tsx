import * as m from '@paraglide/messages';
import { Trans, useTranslation } from '@tempo/next/i18n';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';

export interface ValueDeleteDialogProps {
  attributeName: string;
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  name: string;
  useName?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ValueDeleteDialog: FC<ValueDeleteDialogProps> = ({
  attributeName,
  name,
  confirmButtonState,
  useName,
  onClose,
  onConfirm,
  open,
}) => {
  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      confirmButtonState={confirmButtonState}
      onConfirm={onConfirm}
      variant="delete"
      title={
        m.dashboard_WV_aZ() ?? 'Delete attribute value'
        // dialog title
      }
    >
      <DialogContentText>
        {useName ? (
          <Trans i18nKey={'no3Ygn'} name={name} attributeName={attributeName}>
            {
              'Are you sure you want to delete "{name}" value? If you delete it you won’t be able to assign it to any of the products with "{attributeName}" attribute.'
            }
          </Trans>
        ) : (
          <Trans i18nKey={'JyQoES'} name={name}>
            {'Are you sure you want to delete "{name}" value?'}
          </Trans>
        )}
      </DialogContentText>
    </ActionDialog>
  );
};

ValueDeleteDialog.displayName = 'ValueDeleteDialog';
export default ValueDeleteDialog;
