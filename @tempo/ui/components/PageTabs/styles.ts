import { alpha } from '@mui/material/styles';
import { makeStyles } from '@tempo/ui/theme/styles';

const useStyles = makeStyles(
  (theme) => ({
    tabRoot: {
      '@media (min-width: 600px)': {
        minWidth: 'unset',
      },
      '&.Mui-selected': {
        background: theme.vars.palette.generic.main,
        color: theme.vars.palette.primary[100],
      },
      '&:hover': {
        background: alpha(theme.vars.palette.generic.main, 0.6),
      },
      color: theme.vars.palette.primary[100],
      borderRadius: 4,
      minHeight: 40,
      padding: theme.spacing(1, 2),
      textTransform: 'unset',
    },
    containerRoot: {
      minHeight: 'unset',
    },
    containerFlex: {
      columnGap: theme.spacing(2),
    },
  }),
  {
    name: 'PageTab',
  }
);

export default useStyles;
