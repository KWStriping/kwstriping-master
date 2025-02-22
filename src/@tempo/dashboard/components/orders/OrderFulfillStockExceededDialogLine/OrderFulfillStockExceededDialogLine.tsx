import type {
  FulfillmentFragment,
  OrderFulfillmentLineFragment,
} from '@tempo/api/generated/graphql';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import {
  getAttributesCaption,
  getFulfillmentFormsetQuantity,
  getOrderLineAvailableQuantity,
} from '@tempo/dashboard/oldSrc/orders/utils/data';
import type { OrderFulfillStockFormsetData } from '@tempo/dashboard/oldSrc/orders/utils/data';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';

// import { useStyles } from "../OrderFulfillStockExceededDialog/styles";

export interface OrderFulfillStockExceededDialogLineProps {
  line: OrderFulfillmentLineFragment | FulfillmentFragment['lines'][0];
  warehouseId: string;
  formsetData: OrderFulfillStockFormsetData;
}

const OrderFulfillStockExceededDialogLine: FC<OrderFulfillStockExceededDialogLineProps> = (
  props
) => {
  const { line: genericLine, warehouseId, formsetData } = props;

  if (!genericLine) return null;

  const line = 'orderLine' in genericLine ? genericLine.orderLine : genericLine;

  const stock = line?.variant?.stocks.find((stock) => stock.warehouse.id === warehouseId);

  return (
    <TableRow key={line?.id}>
      <TableCellAvatar className={styles.colName ?? ''} thumbnail={line?.thumbnail?.url}>
        {line?.productName}
        {line.variant && 'attributes' in line.variant && (
          <Typography color="textSecondary" variant="caption">
            {getAttributesCaption(line.variant?.attributes)}
          </Typography>
        )}
      </TableCellAvatar>
      <TableCell className={styles.colQuantity ?? ''}>
        {getFulfillmentFormsetQuantity(formsetData, line)}
      </TableCell>
      <TableCell className={styles.colWarehouseStock ?? ''}>
        {getOrderLineAvailableQuantity(line, stock)}
      </TableCell>
    </TableRow>
  );
};

OrderFulfillStockExceededDialogLine.displayName = 'OrderFulfillStockExceededDialogLine';
export default OrderFulfillStockExceededDialogLine;
