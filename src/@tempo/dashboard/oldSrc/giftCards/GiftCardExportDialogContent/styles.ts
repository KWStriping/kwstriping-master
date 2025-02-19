import { makeStyles } from '@tempo/ui/theme/styles';
const useStyles = makeStyles(
  (theme) => ({
    note: {
      marginTop: theme.spacing(3),
    },
  }),
  { name: 'GiftCardExportDialogContent' }
);

export default useStyles;
