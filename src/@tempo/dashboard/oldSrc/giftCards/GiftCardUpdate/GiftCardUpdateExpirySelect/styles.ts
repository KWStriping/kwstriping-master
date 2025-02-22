import { makeStyles } from '@tempo/ui/theme/styles';
export const useGiftCardExpirySelectStyles = makeStyles(
  (theme) => ({
    radioGroupContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    dateField: {
      display: 'block',
      width: 400,
      marginTop: theme.spacing(2),
    },
    periodField: {
      display: 'flex',
    },
  }),
  { name: 'GiftCardUpdateDetailsExpirySection' }
);
