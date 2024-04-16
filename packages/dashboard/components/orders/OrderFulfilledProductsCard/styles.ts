import { makeStyles } from '@core/ui/theme/styles';

const useStyles = makeStyles(
  (theme) => ({
    actions: {
      flexDirection: 'row-reverse',
      padding: theme.spacing(2, 4),
    },
    deleteIcon: {
      height: 40,
      paddingRight: 0,
      paddingLeft: theme.spacing(1),
      width: 40,
    },
    table: {
      '& td, & th': {
        '&:not(:first-child):not(:last-child)': {
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
        },
      },
      tableLayout: 'fixed',
    },
    infoLabel: {
      display: 'inline-block',
    },
    infoLabelWithMargin: {
      marginBottom: theme.spacing(1),
    },
    infoRow: {
      padding: theme.spacing(2, 3),
    },
  }),
  { name: 'OrderFulfilledProductsCard' }
);

export default useStyles;
