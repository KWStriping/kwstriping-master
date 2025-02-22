import { makeStyles } from '@tempo/ui/theme/styles';
export const useGiftCardCreateExpirySelectStyles = makeStyles(
  (theme) => ({
    radioGroupContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    dateField: {
      width: 400,
    },
    periodField: {
      alignItems: 'center',
      display: 'flex',
      gap: theme.spacing(2),
    },
  }),
  { name: 'GiftCardExpirySelect' }
);
