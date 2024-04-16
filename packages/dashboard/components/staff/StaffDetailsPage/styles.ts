import { makeStyles } from '@core/ui/theme/styles';
const useStyles = makeStyles(
  () => ({
    noOverflow: {
      '&&': {
        overflow: 'visible',
      },
    },
  }),
  { name: 'StaffDetailsPage' }
);

export default useStyles;
