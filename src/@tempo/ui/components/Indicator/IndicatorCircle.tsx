import clsx from 'clsx';

import { Circle } from './Circle';
import type { IndicatorIcon } from './Indicator';
import { getSizeDimension, useStyles } from './styles';

export interface IndicatorCircleProps {
  icon: IndicatorIcon;
  className?: string;
}

export const IndicatorCircle = ({ icon, className }: IndicatorCircleProps) => {
  const styles = useStyles({ size: 'regular', icon });

  const viewBoxSize = getSizeDimension('regular');

  return (
    <span className={clsx(styles.wrapper, styles.wrapperCircle ?? '', className)}>
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.absolute ?? ''}
      >
        <Circle className={styles.circlePath ?? ''} />
      </svg>
      {icon === 'success' && (
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          fill="none"
          className={styles.absolute ?? ''}
        >
          <path
            d="M8 12.8571L10.1053 15L16 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
};
