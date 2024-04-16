import { makeStyles } from '@core/ui/theme/styles';
import { alpha } from '@mui/material/styles';

export const useStyles = makeStyles(
  (theme) => ({
    colAvatar: {
      width: 64,
    },
    defaultVariant: {
      color: alpha(theme.vars.palette.text.secondary, 0.6),
      display: 'block',
    },
    firstVariant: {
      width: 104,
    },
    link: {
      cursor: 'pointer',
    },
    noHandle: {
      '&&&': {
        paddingRight: theme.spacing(3),
      },
      textAlign: 'right',
    },
    rowActive: {
      borderLeft: `${theme.vars.palette.primary.main} solid 2px`,
    },
    rowNew: {
      '&:hover': {
        backgroundColor: 'unset !important',
      },
    },
  }),
  { name: 'ProductNavigation' }
);
