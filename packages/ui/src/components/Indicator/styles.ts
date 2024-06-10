import { makeStyles } from '@core/ui/theme/styles';
import type { Theme } from '@core/ui/theme/types';
import type { IndicatorProps, IndicatorSize } from './Indicator';

export const getIconColor =
  (theme: Theme, type: 'light' | 'main' | 'dark') => (props: Pick<IndicatorProps, 'icon'>) => {
    switch (props.icon) {
      case 'warning':
        return theme.vars.palette.warning[type];
      case 'success':
        return theme.vars.palette.success[type];
      case 'fail':
      case 'error':
        return theme.vars.palette.error[type];
      default:
        return 'inherit';
    }
  };

export const getSizeDimension = (size: IndicatorSize) => (size === 'regular' ? 24 : 16);

export const useStyles = makeStyles<
  Required<Pick<IndicatorProps, 'icon' | 'size'>>,
  'wrapper' | 'wrapperCircle' | 'wrapperOutline' | 'absolute' | 'circlePath' | 'circleOutline'
>(
  (theme) => ({
    wrapper: {
      position: 'relative',
      display: 'inline-block',
      width: (props) => `${getSizeDimension(props.size)}px`,
      height: (props) => `${getSizeDimension(props.size)}px`,
      color: theme.vars.palette.primary[100],
    },
    wrapperCircle: {
      color: getIconColor(theme, 'main'),
    },
    wrapperOutline: {
      color: getIconColor(theme, 'dark'),
    },
    absolute: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    circlePath: {
      fill: getIconColor(theme, 'main'),
    },
    circleOutline: {
      stroke: getIconColor(theme, 'dark'),
    },
  }),
  { name: 'Indicator' }
);
