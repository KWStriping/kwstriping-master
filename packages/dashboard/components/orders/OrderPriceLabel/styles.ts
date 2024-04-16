import { makeStyles } from '@core/ui/theme/styles';
export const useStyles = makeStyles(
  () => ({
    percentDiscountLabelContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
  }),
  { name: 'OrderPriceLabel' }
);
