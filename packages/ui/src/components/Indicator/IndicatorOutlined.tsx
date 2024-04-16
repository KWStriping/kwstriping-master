import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import clsx from 'clsx';

import { CircleOutline } from './CircleOutline';
import type { IndicatorCombinations, IndicatorIcon, IndicatorSize } from './Indicator';
import { mapVariantToIcon } from './Indicator';
import { getSizeDimension, useStyles } from './styles';

export interface IndicatorOutlinedProps {
  icon: IndicatorIcon;
  size?: IndicatorSize;
  color?: 'default' | 'text';
  className?: string;
}

const getIconComponent = (icon: IndicatorIcon, size: IndicatorSize) => {
  if (icon === 'fail') {
    return ErrorOutlineIcon;
  }
  return mapVariantToIcon[`${icon}-${size}` as IndicatorCombinations];
};

export const IndicatorOutlined = ({
  icon,
  size = 'regular',
  color = 'default',
  className,
}: IndicatorOutlinedProps) => {
  const styles = useStyles({ icon, size });

  const Icon = getIconComponent(icon, size);
  const viewBoxSize = getSizeDimension(size);

  const hasColor = color === 'default';

  return (
    <span className={clsx(styles.wrapper, hasColor && (styles.wrapperOutline ?? ''), className)}>
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.absolute ?? ''}
      >
        <CircleOutline
          size={size}
          className={clsx(styles.absolute, hasColor && styles.circleOutline)}
        />
      </svg>
      <Icon />
    </span>
  );
};
