import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import styles from './index.module.css';
interface ErrorNoticeBarProps {
  className?: string;
  message: string | ReactNode;
}

const ErrorNoticeBar: FC<ErrorNoticeBarProps> = (props) => {
  const { className, message } = props;
  return (
    <Card className={clsx(styles.root, className)}>
      <CardContent>
        <Typography variant="body1">{message}</Typography>
      </CardContent>
    </Card>
  );
};
ErrorNoticeBar.displayName = 'ErrorNoticeBar';
export default ErrorNoticeBar;
