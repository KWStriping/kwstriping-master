import { makeStyles } from '@core/ui/theme/styles';
export const useGiftCardDeleteDialogContentStyles = makeStyles(
  () => ({
    progressContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
  }),
  { name: 'GiftCardDeleteDialogContent' }
);
