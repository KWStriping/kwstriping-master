import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { makeStyles } from '@tempo/ui/theme/styles';
import type { DialogProps } from '@tempo/dashboard/oldSrc/types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { FC } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    button: {
      backgroundColor: theme.vars.palette.error.main,
    },
  }),
  {
    name: 'OrderCannotCancelOrderDialog',
  }
);

const OrderCannotCancelOrderDialog: FC<DialogProps> = ({ open, onClose }) => {
  // const styles = useStyles();
  const styles = {};
  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm">
      <DialogTitle>{m.dashboard_couldNotCancelOrder() ?? 'Unable to cancel order'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t(
            'dashboard_+jcaN',
            'There are still fulfillments created for this order. Cancel the fulfillments first before you cancel the order.'
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" className={styles.button ?? ''} onClick={onClose}>
          {m.dashboard_ok() ?? 'OK'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
OrderCannotCancelOrderDialog.displayName = 'OrderCannotCancelOrderDialog';
export default OrderCannotCancelOrderDialog;
