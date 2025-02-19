import { makeStyles } from '@tempo/ui/theme/styles';

const useStyles = makeStyles(
  (theme) => ({
    dark: {},
    success: {
      color: theme.vars.palette.success.main,
      '&$dark': {
        color: theme.vars.palette.success.dark,
      },
    },
    error: {
      color: theme.vars.palette.error.main,
      '&$dark': {
        color: theme.vars.palette.error.dark,
      },
    },
    warning: {
      color: theme.vars.palette.warning.main,
      '&$dark': {
        color: theme.vars.palette.warning.dark,
      },
    },
    info: {
      color: theme.vars.palette.primary[100],
    },
  }),
  { name: 'CircleIndicator' }
);

export default useStyles;
