import type { PillColor } from '@tempo/ui/components/pill/Pill';
import { CircleIndicatorIcon, SuccessCircleIndicatorIcon } from '@tempo/ui/icons';
import { useColorScheme } from '@mui/material/styles';
import clsx from 'clsx';
import type { FC } from 'react';

// import useStyles from './styles';

export type CircleIndicatorColor = PillColor;

export interface CircleIndicatorProps {
  color: CircleIndicatorColor;
}

export const CircleIndicator: FC<CircleIndicatorProps> = ({ color }) => {
  const { mode } = useColorScheme();
  // const styles = useStyles();
  const styles = {};

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
