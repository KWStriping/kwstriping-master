import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@core/ui/theme/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { FC } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    deleteButton: {
      '&:hover': {
        backgroundColor: theme.vars.palette.error.main,
      },
      backgroundColor: theme.vars.palette.error.main,
      color: theme.vars.palette.error.contrastText,
    },
  }),
  { name: 'ProductDeleteDialog' }
);

export interface ProductDeleteDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  name: string;
  onClose?();
  onConfirm?();
}

const ProductDeleteDialog: FC<ProductDeleteDialogProps> = (props) => {
  const { confirmButtonState, name, open, onConfirm, onClose } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <>
          {/* dialog header */}

          {t('dashboard.FJabu', 'Delete Variant')}
        </>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <>
            {t(
              'dashboard.wNtFn',
              'Are you sure you want to delete {{name}}?',
              // "delete product variant"
              {
                name,
              }
            )}
          </>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <BackButton onClick={onClose} />
        <ConfirmButton
          transitionState={confirmButtonState}
          className={styles.deleteButton ?? ''}
          onClick={onConfirm}
        >
          <>
            {/* button */}

            {t('dashboard.bkmfG', 'Delete variant')}
          </>
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
ProductDeleteDialog.displayName = 'ProductDeleteDialog';
export default ProductDeleteDialog;
