import * as m from '@paraglide/messages';
import { Trans, useTranslation } from '@tempo/next/i18n';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import { Button } from '@tempo/ui/components/buttons/Button';
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
  {
    name: 'CategoryDeleteDialog',
  }
);

export interface CategoryDeleteDialogProps {
  open: boolean;
  name: string;
  onClose: () => void;
  onConfirm: () => void;
}

const CategoryDeleteDialog: FC<CategoryDeleteDialogProps> = (props) => {
  const { name, open, onConfirm, onClose } = props;
  const styles = {};
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <>
          {/* dialog title */}

          {m.dashboard_o_UIb() ?? 'Delete category'}
        </>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Trans t={t} i18nKey={'dJQxHt'} categoryName={`<strong>${name}</strong>}`}>
            {'Are you sure you want to delete {categoryName}?'}
          </Trans>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <BackButton onClick={onClose} />
        <Button className={styles.deleteButton ?? ''} color="primary" onClick={onConfirm}>
          {m.dashboard_save() ?? 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CategoryDeleteDialog.displayName = 'CategoryDeleteDialog';
export default CategoryDeleteDialog;
