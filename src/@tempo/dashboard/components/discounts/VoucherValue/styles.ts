import { makeStyles } from '@tempo/ui/theme/styles';
export const useStyles = makeStyles(
  (theme) => ({
    colName: {
      fontSize: 14,
      width: 'auto',
    },
    colPrice: {
      minWidth: 300,
    },
    colType: {
      fontSize: 14,
      textAlign: 'right',
      width: 300,
    },
    table: {
      tableLayout: 'fixed',
    },
    tableContainer: {
      margin: theme.spacing(0, -4),
    },
  }),
  {
    name: 'VoucherValue',
  }
);
