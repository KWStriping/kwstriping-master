import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const useStyles = makeStyles(
  (theme) => ({
    clickableRow: {
      cursor: 'pointer',
    },
    colName: {
      textAlign: 'left',
      width: 'auto',
    },
    colPrice: {
      textAlign: 'right',
      width: 150,
    },
    colQuantity: {
      textAlign: 'center',
      width: 110,
    },
    colSku: {
      textAlign: 'right',
      textOverflow: 'ellipsis',
      width: 140,
    },
    colTotal: {
      textAlign: 'right',
      width: 170,
    },
    infoLabel: {
      display: 'inline-block',
    },
    infoLabelWithMargin: {
      marginBottom: theme.spacing(1),
    },
    infoRow: {
      padding: theme.spacing(2, 3),
    },
    orderNumber: {
      display: 'inline',
      marginLeft: theme.spacing(1),
    },
    statusBar: {
      paddingTop: 0,
    },
    table: {
      tableLayout: 'fixed',
    },
  }),
  { name: 'TableHeader' }
);

const TableHeader = () => {
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();
  return (
    <>
      <colgroup>
        <col className={styles.colName ?? ''} />
        <col className={styles.colSku ?? ''} />
        <col className={styles.colQuantity ?? ''} />
        <col className={styles.colPrice ?? ''} />
        <col className={styles.colTotal ?? ''} />
      </colgroup>
      <TableHead>
        <TableRow>
          <TableCell className={styles.colName ?? ''}>
            {t('dashboard.productName', 'Product')}
          </TableCell>
          <TableCell className={styles.colSku ?? ''}>
            <>
              {/* ordered product sku */}

              {t('dashboard.J81ri', 'SKU')}
            </>
          </TableCell>
          <TableCell className={styles.colQuantity ?? ''}>
            <>
              {/* ordered product quantity */}

              {t('dashboard.vpAXl', 'Quantity')}
            </>
          </TableCell>
          <TableCell className={styles.colPrice ?? ''}>
            <>
              {/* product price */}

              {t('dashboard.810WJ', 'Price')}
            </>
          </TableCell>
          <TableCell className={styles.colTotal ?? ''}>
            <>
              {/* order line total price */}

              {t('dashboard.T6YYk', 'Total')}
            </>
          </TableCell>
        </TableRow>
      </TableHead>
    </>
  );
};

export default TableHeader;
