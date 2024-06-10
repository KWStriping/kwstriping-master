import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { useStyles } from './styles';

export interface DialogHeaderProps extends TypographyProps<'h5'> {
  onClose: () => void;
}

export const DialogHeader: FC<DialogHeaderProps> = ({ onClose, children, ...props }) => {
  const styles = useStyles();

  return (
    <>
      <DialogTitle className={styles.wrapper ?? ''} id="alert-dialog-title">
        <Typography variant="h5" component="h5" {...props}>
          {children}
        </Typography>
        <button
          className={styles.button ?? ''}
          onClick={onClose}
          aria-label="Close modal"
          data-test="close"
        >
          <CloseIcon />
        </button>
      </DialogTitle>
    </>
  );
};
DialogHeader.displayName = 'DialogHeader';

export default DialogHeader;
