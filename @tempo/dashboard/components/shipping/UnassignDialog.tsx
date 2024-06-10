import * as m from '@paraglide/messages';
import { Trans, useTranslation } from '@tempo/next/i18n';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';

export interface UnassignDialogProps {
  open: boolean;
  confirmButtonState: ConfirmButtonTransitionState;
  idsLength: number;
  closeModal: () => void;
  onConfirm: () => void;
}

export const UnassignDialog: FC<UnassignDialogProps> = ({
  closeModal,
  confirmButtonState,
  idsLength,
  onConfirm,
  open,
}) => {
  return (
    <ActionDialog
      open={open}
      title={
        m.dashboard_fbp__() ?? 'Unassign Products From Shipping'
        // dialog header
      }
      confirmButtonState={confirmButtonState}
      onClose={closeModal}
      onConfirm={onConfirm}
      confirmButtonLabel={t(
        'dashboard_/Fd7s',
        'Unassign and save'
        // unassign products from shipping rate and save, button
      )}
    >
      <DialogContentText>
        <Trans
          t={t}
          i18nKey={'AHK0K9'}
          count={idsLength}
          displayQuantity={<strong>{idsLength}</strong>}
        >
          {
            '{count,plural,one{Are you sure you want to unassign this product?} other{Are you sure you want to unassign {displayQuantity} products?}}'
          }
        </Trans>
      </DialogContentText>
    </ActionDialog>
  );
};

export default UnassignDialog;
