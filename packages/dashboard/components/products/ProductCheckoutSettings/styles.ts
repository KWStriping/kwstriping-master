import { makeStyles } from '@core/ui/theme/styles';
const useStyles = makeStyles(
  (theme) => ({
    preview: {
      marginLeft: theme.spacing(1),
    },
  }),
  { name: 'ProductCheckoutSettings' }
);

export default useStyles;
