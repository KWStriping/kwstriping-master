import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { makeStyles } from '@core/ui/theme/styles';
import type { DialogProps } from '@dashboard/oldSrc/types';
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
  const { t } = useTranslation();
  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm">
      <DialogTitle>{t('dashboard.couldNotCancelOrder', 'Unable to cancel order')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t(
            'dashboard.+jcaN',
            'There are still fulfillments created for this order. Cancel the fulfillments first before you cancel the order.'
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" className={styles.button ?? ''} onClick={onClose}>
          {t('dashboard.ok', 'OK')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
OrderCannotCancelOrderDialog.displayName = 'OrderCannotCancelOrderDialog';
export default OrderCannotCancelOrderDialog;
