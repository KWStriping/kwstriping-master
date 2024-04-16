import { makeStyles } from '@core/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    dialogContent: {
      maxHeight: `calc(100vh - 250px)`,
      overflowY: 'scroll',
      overflowX: 'hidden',
      padding: '24px',
      margin: 0,
    },
    scrollableWrapper: {
      maxHeight: 400,
      overflowY: 'scroll',
    },
    container: {
      display: 'block',
    },
    optionLabel: {
      display: 'block',
    },
    searchInput: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  }),
  { name: 'OrderCustomerAddressesEditDialog' }
);
