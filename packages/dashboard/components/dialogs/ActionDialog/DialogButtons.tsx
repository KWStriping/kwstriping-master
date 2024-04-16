import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import DialogActions from '@mui/material/DialogActions';
import type { FC, ReactNode } from 'react';

import type { ActionDialogVariant } from './types';

interface DialogButtonsProps {
  onClose: () => void;
  confirmButtonLabel?: string;
  confirmButtonState?: ConfirmButtonTransitionState;
  disabled?: boolean;
  variant?: ActionDialogVariant;
  children?: ReactNode;
  showBackButton?: boolean;
  onConfirm: () => void;
}

const DialogButtons: FC<DialogButtonsProps> = (props) => {
  const {
    confirmButtonLabel,
    confirmButtonState,
    disabled,
    variant,
    onConfirm,
    onClose,
    children,
    showBackButton = true,
  } = props;

  const { t } = useTranslation();

  return (
    <DialogActions>
      {children}
      {showBackButton && <BackButton onClick={onClose} />}
      {variant !== 'info' && (
        <ConfirmButton
          disabled={disabled}
          transitionState={confirmButtonState}
          onClick={onConfirm}
          data-test-id="submit"
          {...(variant === 'delete' && { color: 'error' })}
        >
          {confirmButtonLabel ||
            (variant === 'delete'
              ? t('dashboard.delete', 'Delete')
              : t('dashboard.onfirm', 'Confirm'))}
        </ConfirmButton>
      )}
    </DialogActions>
  );
};

DialogButtons.defaultProps = {
  confirmButtonState: 'default',
  variant: 'default',
};

export default DialogButtons;
