import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import clsx from 'clsx';
import type { FC } from 'react';
import styles from './index.module.css';

export type AlertVariant = 'error' | 'warning' | 'success' | 'info';
export interface AlertBaseProps extends Omit<CardProps, 'variant'> {
  className?: string;
  variant: AlertVariant;
}

export const AlertBase: FC<AlertBaseProps> = ({
  className,
  variant = 'info',
  children,
  ...rest
}) => {
  return (
    <Card
      elevation={0}
      className={clsx(
        className,
        styles.root ?? '',
        variant === 'error' && (styles.error ?? ''),
        variant === 'warning' && (styles.warning ?? ''),
        variant === 'success' && styles.success
      )}
      data-test="alert"
      {...rest}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

AlertBase.displayName = 'AlertBase';
