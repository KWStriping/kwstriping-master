import { makeStyles } from '@tempo/ui/theme/styles';
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
