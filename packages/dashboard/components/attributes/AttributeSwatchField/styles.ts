import { makeStyles } from '@core/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    filePreview: {
      marginTop: theme.spacing(3),
      width: 216,
      height: 216,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  }),
  { name: 'AttributeSwatchField' }
);
