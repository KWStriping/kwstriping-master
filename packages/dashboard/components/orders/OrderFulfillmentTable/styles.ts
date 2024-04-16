import { makeStyles } from '@core/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    colQuantityHeader: {
      textAlign: 'right',
    },
    colStock: {
      textAlign: 'right',
      width: 180,
    },
    colQuantity: {
      textAlign: 'right',
      width: 210,
    },
    colWarehouse: {
      textAlign: 'right',
      width: 200,
    },
    shipmentInformationCard: {
      padding: theme.spacing(3),
      alignSelf: 'start',
      display: 'grid',
      gridRowGap: theme.spacing(1),
    },
    supportHeader: {
      textTransform: 'uppercase',
      color: theme.vars.palette.primary[300],
      fontWeight: 500,
      letterSpacing: '0.1em',
      fontSize: '12px',
      lineHeight: '160%',
      marginBottom: theme.spacing(2),
    },
  }),
  { name: 'OrderFulfillmentPage' }
);
