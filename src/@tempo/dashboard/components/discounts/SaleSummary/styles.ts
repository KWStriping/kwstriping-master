import { makeStyles } from '@tempo/ui/theme/styles';

const useStyles = makeStyles(
  {
    ellipsis: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  { name: 'SaleSummary' }
);

export default useStyles;
