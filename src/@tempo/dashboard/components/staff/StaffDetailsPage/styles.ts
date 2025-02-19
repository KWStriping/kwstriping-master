import { makeStyles } from '@tempo/ui/theme/styles';
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
