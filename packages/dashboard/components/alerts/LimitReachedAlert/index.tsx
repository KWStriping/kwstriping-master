import type { AlertProps } from '@core/ui/components/Alert';
import { Alert } from '@core/ui/components/Alert';
import type { FC } from 'react';
import styles from './index.module.css';

export type LimitReachedAlertProps = Omit<AlertProps, 'variant' | 'close'>;

const LimitReachedAlert: FC<LimitReachedAlertProps> = (props) => {
  return <Alert variant="warning" close className={styles.root ?? ''} {...props} />;
};

LimitReachedAlert.displayName = 'LimitReachedAlert';
export default LimitReachedAlert;
