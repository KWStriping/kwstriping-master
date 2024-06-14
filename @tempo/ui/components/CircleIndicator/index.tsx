import { useColorScheme } from '@mui/material/styles';
import clsx from 'clsx';
import type { FC } from 'react';
import styles from './index.module.css';
import { CircleIndicatorIcon, SuccessCircleIndicatorIcon } from '@tempo/ui/icons';
import type { PillColor } from '@tempo/ui/components/pill/Pill';

export type CircleIndicatorColor = PillColor;

export interface CircleIndicatorProps {
  color: CircleIndicatorColor;
}

export const CircleIndicator: FC<CircleIndicatorProps> = ({ color }) => {
  const { mode } = useColorScheme();

  return color === 'success' ? (
    <SuccessCircleIndicatorIcon
      className={clsx(styles.success, mode === 'dark' && styles.dark)}
    />
  ) : (
    <CircleIndicatorIcon
      className={clsx(
        color === 'error' && (styles.error ?? ''),
        color === 'warning' && (styles.warning ?? ''),
        color === 'info' && (styles.info ?? ''),
        mode === 'dark' && styles.dark
      )}
    />
  );
};

CircleIndicator.displayName = 'CircleIndicator';
