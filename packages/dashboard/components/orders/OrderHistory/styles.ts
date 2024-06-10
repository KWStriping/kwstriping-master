import { makeStyles } from '@core/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    header: {
      fontWeight: 500,
      marginBottom: theme.spacing(1),
    },
    root: { marginTop: theme.spacing(4) },
    user: {
      marginBottom: theme.spacing(1),
    },
  }),
  { name: 'OrderHistory' }
);
