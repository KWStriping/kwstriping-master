import { makeStyles } from '@tempo/ui/theme/styles';
export const useUpdateBalanceDialogStyles = makeStyles(
  (theme) => ({
    inputContainer: {
      width: '100%',
    },
    currencyCodeContainer: {
      height: 35,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginRight: theme.spacing(1),
    },
  }),
  { name: 'GiftCardUpdateBalanceDialog' }
);
