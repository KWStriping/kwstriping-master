import { makeStyles } from '@core/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    date: {
      marginBottom: theme.spacing(3),
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 0,
    },
  }),
  {
    name: 'OrderDetailsPage',
  }
);
