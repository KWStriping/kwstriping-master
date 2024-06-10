import { makeStyles } from '@core/ui/theme/styles';
import type { Theme } from '@core/ui/theme/types';
import type { TooltipProps } from './Tooltip';

type Side = 'top' | 'right' | 'bottom' | 'left';

export type StyleProps = Pick<TooltipProps, 'variant'> & { side: Side };

export const getBorderColor = (isDark: boolean, theme: Theme) => (props: StyleProps) => {
  // if (isDark) {
  //   switch (props.variant) {
  //     case "success":
  //       return dark.success.light;
  //     case "warning":
  //       return dark.warning.light;
  //     case "error":
  //       return dark.fail.light;
  //     default:
  //       return "#797d7d"; // dark.primary[300] without alpha
  //   }
  // }
  switch (props.variant) {
    case 'success':
      return theme.vars.palette.success.main;
    case 'warning':
      return theme.vars.palette.warning.main;
    case 'error':
      return theme.vars.palette.error.main;
    default:
      return '#7d7f7f'; // light.primary[300] without alpha
  }
};

export const getBackgroundColor = (isDark: boolean, theme: Theme) => (props: StyleProps) => {
  if (!isDark) return theme.vars.palette.common.white;
  switch (props.variant) {
    case 'success':
      return theme.vars.palette.success.dark;
    case 'warning':
      return theme.vars.palette.warning.dark;
    case 'error':
      return theme.vars.palette.error.dark;
    default:
      return theme.vars.palette.primary[100];
  }
  // if (isDark) {
  //   switch (props.variant) {
  //     case "success":
  //       return dark.success.dark;
  //     case "warning":
  //       return dark.warning.dark;
  //     case "error":
  //       return dark.fail.dark;
  //     default:
  //       return dark.primary[100];
  //   }
  // }
};

const useStyles = makeStyles<StyleProps, 'tooltip' | 'dark' | 'header'>(
  (theme) => ({
    dark: {
      '& $tooltip': {
        color: (props) => theme.vars.palette.primary[200],
        backgroundColor: getBackgroundColor(true, theme),
        borderColor: getBorderColor(true, theme),
      },
    },
    tooltip: {
      backgroundColor: getBackgroundColor(false, theme),
      padding: theme.spacing(1.5),
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.vars.palette.primary[300]}`,
      borderWidth: '1px',
      fontWeight: 500,
      borderColor: getBorderColor(false, theme),

      color: (props) => {
        switch (props.variant) {
          case 'success':
            return theme.vars.palette.success.dark;
          case 'warning':
            return theme.vars.palette.warning.dark;
          case 'error':
            return theme.vars.palette.error.dark;
          default:
            return theme.vars.palette.primary[100];
        }
      },
    },
    header: {
      fontSize: theme.typography.caption.fontSize,
      letterSpacing: '0.1em',
      fontWeight: 500,
      textTransform: 'uppercase',
      marginBottom: theme.spacing(0.5),
      // color: light.primary[300],
    },
  }),
  {
    name: 'Tooltip',
  }
);

export const useArrowStyles = makeStyles<StyleProps>(
  (theme) => ({
    borderPath: {
      fill: getBorderColor(false, theme),
    },
    backgroundPath: {
      fill: getBackgroundColor(false, theme),
    },
    arrowContainer: {
      width: '14px',
      height: '8px',
      position: 'absolute',
      transform: (props) => {
        switch (props.side) {
          case 'top':
            return 'rotate(180deg)';
          case 'bottom':
            return 'rotate(0deg)';
          case 'left':
            return 'rotate(90deg)';
          case 'right':
            return 'rotate(-90deg)';
          default:
            return 'rotate(0deg)';
        }
      },
      top: (props) => (props.side === 'bottom' && '-13px') || '',
      bottom: (props) => (props.side === 'top' && '-13px') || '',
      left: (props) => (props.side === 'right' && '-16px') || '',
      right: (props) => (props.side === 'left' && '-16px') || '',
    },
    dark: {
      '& $borderPath': {
        fill: getBorderColor(true, theme),
      },

      '& $backgroundPath': {
        fill: getBackgroundColor(true, theme),
      },
    },
  }),
  { name: 'TooltipArrow' }
);
export default useStyles;

export const useMountWrapperStyles = makeStyles(
  {
    wrapper: {
      all: 'unset',
      display: 'inline-block',
      lineHeight: 0,
      pointerEvents: 'all',
    },
  },
  { name: 'TooltipMountWrapper' }
);
