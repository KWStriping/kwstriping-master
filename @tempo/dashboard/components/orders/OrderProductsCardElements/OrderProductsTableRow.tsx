import { makeStyles } from '@tempo/ui/theme/styles';
import Money from '@tempo/dashboard/components/core/Money';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';
import { AVATAR_MARGIN } from '@tempo/dashboard/components/tables/TableCellAvatar/Avatar';
import type { OrderDetailsFragment, OrderLineFragment } from '@tempo/api/generated/graphql';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    colNameLabel: {
      marginLeft: AVATAR_MARGIN,
    },
    colPrice: {
      textAlign: 'right',
    },
    colQuantity: {
      textAlign: 'center',
    },
    colSku: {
      textAlign: 'right',
      textOverflow: 'ellipsis',
    },
    colTotal: {
      textAlign: 'right',
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
  }),
  { name: 'TableLine' }
);

// TODO: better name?
type FulfillmentLine = NonNullable<
  NonNullable<OrderDetailsFragment['fulfillments']>[0]['lines']
>[0];

interface TableLineProps {
  line: FulfillmentLine | OrderLineFragment;
  isOrderLine?: boolean;
}

const TableLine: FC<TableLineProps> = ({ line: lineData, isOrderLine = false }) => {
  const { quantity, quantityToFulfill } = lineData as OrderLineFragment;
  // const styles = useStyles();
  const styles = {};

  if (!lineData) {
    return <Skeleton />;
  }

  const line = isOrderLine
    ? ({
        ...lineData,
        orderLine: lineData,
      } as FulfillmentLine)
    : (lineData as FulfillmentLine);

  const quantityToDisplay = isOrderLine ? quantityToFulfill : quantity;

  return (
    <TableRow key={line.id}>
      <TableCellAvatar
        className={styles.colName ?? ''}
        thumbnail={line.orderLine?.thumbnail?.url}
      >
        {line.orderLine?.productName || <Skeleton />}
      </TableCellAvatar>
      <TableCell className={styles.colSku ?? ''}>
        {line?.orderLine ? line.orderLine.productSku : <Skeleton />}
      </TableCell>
      <TableCell className={styles.colQuantity ?? ''}>
        {quantityToDisplay || <Skeleton />}
      </TableCell>
      <TableCell className={styles.colPrice ?? ''} align="right">
        {line.orderLine?.unitPrice.gross ? (
          <Money money={line.orderLine?.unitPrice.gross} />
        ) : (
          <Skeleton />
        )}
      </TableCell>
      <TableCell className={styles.colTotal ?? ''} align="right">
        <Money
          money={{
            amount: line.quantity * line.orderLine?.unitPrice.gross.amount,
            currency: line.orderLine?.unitPrice.gross.currency,
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableLine;
