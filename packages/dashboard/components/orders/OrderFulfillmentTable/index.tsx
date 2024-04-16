import { useTranslation } from '@core/i18n';
import { renderCollection } from '@core/ui/utils';
import OrderFulfillmentLine from '@dashboard/components/orders/OrderFulfillmentTable/OrderFulfillmentLine';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import type { OrderDetailsFragment, WarehouseFragment } from '@core/api/graphql';

import { getToFulfillOrderLines } from '@dashboard/oldSrc/orders/utils/data';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import clsx from 'clsx';
import type { FC } from 'react';

import { useStyles } from './styles';

interface OrderFulfillmentTableProps {
  order: Maybe<Pick<OrderDetailsFragment, 'lines'>>;
  warehouses: Maybe<WarehouseFragment[]>;
}

export const OrderFulfillmentTable: FC<OrderFulfillmentTableProps> = ({ order, warehouses }) => {
  const styles = useStyles();
  const { t } = useTranslation();
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
            {t('dashboard.productName', 'Product name')}
          </TableCell>
          <TableCell className={'text-right w-[100px] text-ellipsis'}>
            {t('dashboard.sku', 'SKU')}
          </TableCell>
          <TableCell className={clsx(styles.colQuantity, 'text-right', hideQuantity && 'hidden')}>
            {t('dashboard.quantity', 'Quantity')}
          </TableCell>
          <TableCell className={clsx(styles.colStock ?? '', hideStock && 'hidden')}>
            {t('dashboard.stock', 'Stock')}
          </TableCell>
          <TableCell className={styles.colWarehouse ?? ''}>
            {t('dashboard.warehouse.header', 'Warehouse')}
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
