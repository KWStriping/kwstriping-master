import { makeStyles } from '@core/ui/theme/styles';
const useStyles = makeStyles(
  (theme) => ({
    preview: {
      position: 'absolute',
      top: theme.spacing(-4),
    },
    title: {
      position: 'relative',
    },
  }),
  { name: 'GiftCardListHeader' }
);

export default useStyles;
