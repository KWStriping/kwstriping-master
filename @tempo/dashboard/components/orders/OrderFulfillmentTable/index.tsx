import * as m from '@paraglide/messages';
import { renderCollection } from '@tempo/ui/utils';
import type { OrderDetailsFragment, WarehouseFragment } from '@tempo/api/generated/graphql';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import clsx from 'clsx';
import type { FC } from 'react';

import { useStyles } from './styles';
import { getToFulfillOrderLines } from '@tempo/dashboard/oldSrc/orders/utils/data';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import OrderFulfillmentLine from '@tempo/dashboard/components/orders/OrderFulfillmentTable/OrderFulfillmentLine';

interface OrderFulfillmentTableProps {
  order: Maybe<Pick<OrderDetailsFragment, 'lines'>>;
  warehouses: Maybe<WarehouseFragment[]>;
}

export const OrderFulfillmentTable: FC<OrderFulfillmentTableProps> = ({ order, warehouses }) => {
  const styles = useStyles();
  const fulfillmentLines = getToFulfillOrderLines(order?.lines);
  // const hideQuantity = fulfillmentLines.every(line => line.quantityToFulfill === 1);
  const hideQuantity =
    fulfillmentLines.length === 1 && fulfillmentLines[0]?.quantityToFulfill === 1;
  const hideStock = fulfillmentLines.every((line) => !line?.variant?.stocks?.length);
  return (
    <ResponsiveTable>
      <TableHead>
        <TableRow>
          <TableCell className={'w-[220px]'}>
            {m.dashboard_productName() ?? 'Product name'}
          </TableCell>
          <TableCell className={'text-right w-[100px] text-ellipsis'}>
            {m.dashboard_sku() ?? 'SKU'}
          </TableCell>
          <TableCell className={clsx(styles.colQuantity, 'text-right', hideQuantity && 'hidden')}>
            {m.dashboard_quantity() ?? 'Quantity'}
          </TableCell>
          <TableCell className={clsx(styles.colStock ?? '', hideStock && 'hidden')}>
            {m.dashboard_stock() ?? 'Stock'}
          </TableCell>
          <TableCell className={styles.colWarehouse ?? ''}>
            {m.dashboard_warehouse_header() ?? 'Warehouse'}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {renderCollection(fulfillmentLines, (line, lineIndex) => (
          <OrderFulfillmentLine
            key={line.id}
            line={line}
            lineIndex={lineIndex}
            hideQuantity={hideQuantity}
            hideStock={hideStock}
            warehouses={warehouses}
          />
        ))}
      </TableBody>
    </ResponsiveTable>
  );
};

export default OrderFulfillmentTable;
