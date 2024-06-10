import { makeStyles } from '@core/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    root: {
      ...theme.typography.body1,
      width: '100%',
      '& > div': {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
    totalRow: {
      fontWeight: 600,
    },
    supportText: {
      color: theme.vars.palette.primary[300],
    },
    smallFont: {
      fontSize: theme.typography.body2.fontSize,
    },
    success: {
      color: theme.vars.palette.success.dark,
    },
  }),
  { name: 'OrderPayment' }
);
