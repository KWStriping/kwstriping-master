import { makeStyles } from '@core/ui/theme/styles';

export const useStyles = makeStyles(
  () => ({
    wrapper: {
      overflowY: 'scroll',
      maxHeight: 500,
    },
  }),
  { name: 'DialogTable' }
);
