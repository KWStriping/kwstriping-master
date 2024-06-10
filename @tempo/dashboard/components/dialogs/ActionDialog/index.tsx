import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type { DialogProps } from '@tempo/dashboard/oldSrc/types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { FC, ReactNode } from 'react';

import DialogButtons from './DialogButtons';
import type { ActionDialogVariant, Size } from './types';

export interface ActionDialogProps extends DialogProps {
  children?: ReactNode;
  confirmButtonLabel?: string;
  confirmButtonState: ConfirmButtonTransitionState;
  disabled?: boolean;
  maxWidth?: Size | false;
  title: string;
  variant?: ActionDialogVariant;
  onConfirm: () => void;
}

const ActionDialog: FC<ActionDialogProps> = ({
  children,
  open,
  title,
  onClose,
  variant,
  maxWidth,
  ...rest
}) => {
  return (
    <Dialog fullWidth onClose={onClose} open={open} maxWidth={maxWidth}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogButtons {...rest} onClose={onClose} variant={variant} />
    </Dialog>
  );
};

ActionDialog.defaultProps = {
  maxWidth: 'xs',
};

ActionDialog.displayName = 'ActionDialog';
export default ActionDialog;
