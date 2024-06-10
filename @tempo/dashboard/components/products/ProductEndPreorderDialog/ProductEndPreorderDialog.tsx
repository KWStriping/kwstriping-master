import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';

import { productVariantEndPreorderDialogMessages } from './messages';

export interface ProductEndPreorderDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  variantGlobalSoldUnits?: number;
}

const ProductEndPreorderDialog: FC<ProductEndPreorderDialogProps> = ({
  confirmButtonState,
  open,
  onClose,
  onConfirm,
  variantGlobalSoldUnits,
}) => {
  return (
    <ActionDialog
      confirmButtonLabel={m[productVariantEndPreorderDialogMessages.dialogConfirmButtonLabel]}
      confirmButtonState={confirmButtonState}
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={m.dashboard_ialogTitle() ?? 'Ending preorder'}
      variant="default"
    >
      <DialogContentText>
        {
          (m.dashboard_ialogMessage() ??
            'You are about to end your products preorder. You have sold {{variantGlobalSoldUnits}} units of this variant. Sold units will be allocated at appropriate warehouses. Remember to add remaining threshold stock to warehouses.',
          {
            variantGlobalSoldUnits,
          })
        }
      </DialogContentText>
    </ActionDialog>
  );
};
ProductEndPreorderDialog.displayName = 'ProductEndPreorderDialog';
export default ProductEndPreorderDialog;
