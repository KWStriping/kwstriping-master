import type { TooltipProps } from './Tooltip';
import type { Theme } from '@tempo/ui/theme/types';

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
