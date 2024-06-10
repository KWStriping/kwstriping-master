import IconButton from '@tempo/ui/components/buttons/IconButton';
import { CompleteIcon, NotAllowedIcon } from '@tempo/ui/icons';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC, SVGProps } from 'react';
import { useState } from 'react';
import type { AlertBaseProps, AlertVariant } from './AlertBase';
import { AlertBase } from './AlertBase';
import styles from './index.module.css';

export * from './AlertBase';

export interface AlertProps extends AlertBaseProps {
  close?: boolean;
  title?: string;
}
interface IconProps extends SVGProps<SVGSVGElement> {
  variant: AlertVariant;
}
const Icon: FC<IconProps> = ({ variant, ...props }) => {
  switch (variant) {
    case 'error':
      return <NotAllowedIcon {...props} />;
    case 'warning':
      return <WarningIcon {...props} />;
    case 'success':
      return <CompleteIcon {...props} />;
    default:
      return <InfoIcon {...props} />;
  }
};

export const Alert: FC<AlertProps> = ({
  close = true,
  variant = 'info',
  title,
  children,
  ...rest
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AlertBase variant={variant} {...rest}>
      <div className={styles.container ?? ''}>
        <div className={styles.icon ?? ''}>
          <Icon className={clsx(styles[variant])} variant={variant} />
        </div>
        <div className={styles.content ?? ''}>
          <div className={styles.titleBar ?? ''}>
            {title && <Typography variant="h5">{title}</Typography>}
            {close && (
              <IconButton
                className={clsx(styles.close, !children && styles.closeNoContent)}
                hoverOutline={false}
                color="secondary"
                onClick={() => setVisible(false)}
                data-test="close"
                size="large"
              >
                <CloseIcon />
              </IconButton>
            )}
          </div>
          {typeof children === 'string' ? (
            <Typography variant="body1">{children}</Typography>
          ) : (
            children
          )}
        </div>
      </div>
    </AlertBase>
  );
};

Alert.displayName = 'Alert';
