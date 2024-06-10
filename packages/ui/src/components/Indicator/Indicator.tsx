import SuccessIndicatorIcon from '@mui/icons-material/CheckCircle';
import ErrorIndicatorIcon from '@mui/icons-material/Error';
import WarningIndicatorIcon from '@mui/icons-material/Warning';
import clsx from 'clsx';
import { forwardRef } from 'react';
import type { FC } from 'react';
import { CircleFilled } from './CircleFilled';
import { getSizeDimension, useStyles } from './styles';

export type IndicatorIcon = 'warning' | 'error' | 'success' | 'fail';

export type IndicatorSize = 'regular' | 'small';

export type IndicatorCombinations = `${IndicatorIcon}-${IndicatorSize}`;

export interface IndicatorProps {
  icon: IndicatorIcon;
  variant?: 'outline' | 'filled' | 'text' | 'icon';
  size?: IndicatorSize;
  className?: string;
}

export const mapVariantToIcon: Record<IndicatorCombinations, FC<{ className?: string }>> = {
  'warning-regular': WarningIndicatorIcon,
  'warning-small': WarningIndicatorIcon,
  'fail-regular': ErrorIndicatorIcon,
  'fail-small': ErrorIndicatorIcon,
  'error-regular': ErrorIndicatorIcon,
  'error-small': ErrorIndicatorIcon,
  'success-regular': SuccessIndicatorIcon,
  'success-small': SuccessIndicatorIcon,
};

export const Indicator: FC<IndicatorProps> = forwardRef<HTMLSpanElement, IndicatorProps>(
  ({ icon, size = 'regular', className }, ref) => {
    const styles = useStyles({ icon, size });

    const Icon = mapVariantToIcon[`${icon}-${size}` as IndicatorCombinations];

    const viewBoxSize = getSizeDimension(size);

    return (
      <span className={clsx(styles.wrapper, className)} ref={ref}>
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.absolute ?? ''}
        >
          <CircleFilled size={size} className={styles.circlePath ?? ''} />
        </svg>
        <Icon className={styles.absolute ?? ''} />
      </span>
    );
  }
);
Indicator.displayName = 'Indicator';
