import { Trans, useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import DialogContentText from '@mui/material/DialogContentText';
import type { FC } from 'react';

export interface PageKlassBulkDeleteDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  quantity: number;
  hasPages: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PageKlassBulkDeleteDialog: FC<PageKlassBulkDeleteDialogProps> = ({
  confirmButtonState,
  open,
  quantity,
  hasPages,
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
      title={t(
        'dashboard.cEwXH',
        'Delete Page Types'
        // dialog header
      )}
      variant="delete"
    >
      <DialogContentText>
        {hasPages ? (
          <Trans
            t={t}
            i18nKey={'2Zyit2'}
            count={quantity}
            displayQuantity={<strong>{quantity}</strong>}
          >
            {
              '{count,plural,one{Page Type you want to delete is used by some pages. Deleting this page type will also delete those pages. Are you sure you want to delete this page type? After doing so you won’t be able to revert changes.} other{Page Types you want to delete are used by some pages. Deleting these page types will also delete those pages. Are you sure you want to delete {displayQuantity} page types? After doing so you won’t be able to revert changes.}}'
            }
          </Trans>
        ) : (
          <Trans
            t={t}
            i18nKey={'RZmdM3'}
            count={quantity}
            displayQuantity={<strong>{quantity}</strong>}
          >
            {
              '{count,plural,one{Are you sure you want to delete this page type? After doing so you won’t be able to revert changes.} other{Are you sure you want to delete {displayQuantity} page types? After doing so you won’t be able to revert changes.}}'
            }
          </Trans>
        )}
      </DialogContentText>
    </ActionDialog>
  );
};
PageKlassBulkDeleteDialog.displayName = 'PageKlassBulkDeleteDialog';
export default PageKlassBulkDeleteDialog;
