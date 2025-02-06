import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@tempo/ui/theme/styles';
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
  const styles = {};

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <>
          {/* dialog header */}

          {m.dashboard_FJabu() ?? 'Delete Variant'}
        </>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <>
            {
              (m.dashboard_wNtFn() ?? 'Are you sure you want to delete {{name}}?',
              // "delete product variant"
              {
                name,
              })
            }
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

            {m.dashboard_bkmfG() ?? 'Delete variant'}
          </>
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
ProductDeleteDialog.displayName = 'ProductDeleteDialog';
export default ProductDeleteDialog;
