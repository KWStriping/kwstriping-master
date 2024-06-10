import { makeStyles } from '@tempo/ui/theme/styles';
import CircularProgress from '@mui/material/CircularProgress';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

interface ContentWithProgressProps {
  containerClassName?: string;
  children?: ReactNode;
}

export const useStyles = makeStyles(
  (theme) => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      padding: theme.spacing(3),
    },
  }),
  { name: 'ContentWithProgress' }
);

const ContentWithProgress: FC<ContentWithProgressProps> = ({ containerClassName, children }) => {
  return children ? (
    <>{children}</>
  ) : (
    <div className={clsx(styles.container, containerClassName)}>
      <CircularProgress />
    </div>
  );
  const styles = useStyles();
};

export default ContentWithProgress;
