import { makeStyles } from '@tempo/ui/theme/styles';
import { AVATAR_MARGIN } from '@tempo/dashboard/components/tables/TableCellAvatar/Avatar';

export const useStyles = makeStyles(
  (theme) => ({
    colActions: {
      '&:last-child': {
        paddingRight: 0,
      },
      width: `calc(76px + ${theme.spacing(0.5)})`,
    },
    colProductName: {
      width: 'auto',
      minWidth: 200,
    },
    colNameLabel: {
      marginLeft: `calc(${AVATAR_MARGIN}px + ${theme.spacing(3)})`,
    },
    colVariantName: {
      width: 'auto',
      minWidth: 150,
    },
    colType: {
      width: 'auto',
      minWidth: 150,
    },
    table: {
      tableLayout: 'fixed',
    },
    tableRow: {
      cursor: 'pointer',
    },
  }),
  { name: 'DiscountVariants' }
);
