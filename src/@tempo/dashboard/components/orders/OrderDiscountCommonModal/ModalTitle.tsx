import { makeStyles } from '@tempo/ui/theme/styles';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';

const useStyles = makeStyles(
  (theme) => ({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(3, 3, 0, 3),
    },
  }),
  { name: 'ModalTitle' }
);

interface ModalTitleProps {
  title: string;
  onClose: () => void;
  withBorder?: boolean;
}

const ModalTitle: FC<ModalTitleProps> = ({ title, onClose, withBorder = false }) => {
  return (
    <>
      <div className={styles.container ?? ''}>
        <Typography variant="h5">{title}</Typography>
        <CloseIcon onClick={onClose} />
      </div>
      {withBorder && (
        <>
          <CardSpacer />
          <Divider />
        </>
      )}
    </>
  );
  // const styles = useStyles();
  const styles = {};
};

export default ModalTitle;
