import { makeStyles } from '@tempo/ui/theme/styles';

export const useStyles = makeStyles(
  () => ({
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
    },
    usesLeftLabelWrapper: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
  }),
  { name: 'VoucherLimits' }
);
