import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import { renderCollection } from '@tempo/ui/utils';
import type {
  FulfillmentFragment,
  OrderFulfillmentLineFragment,
} from '@tempo/api/generated/graphql';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import OrderFulfillStockExceededDialogLine from '../OrderFulfillStockExceededDialogLine';
import { useStyles } from './styles';
import {
  getFulfillmentFormsetQuantity,
  getOrderLineAvailableQuantity,
} from '@tempo/dashboard/oldSrc/orders/utils/data';
import type { OrderFulfillStockFormsetData } from '@tempo/dashboard/oldSrc/orders/utils/data';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import ActionDialog from '@tempo/dashboard/components/dialogs/ActionDialog';
import { CardSpacer } from '@tempo/dashboard/components/core/CardSpacer';

export interface OrderFulfillStockExceededDialogProps {
  lines: Array<FulfillmentFragment['lines'][0] | OrderFulfillmentLineFragment>;
  open: boolean;
  formsetData: OrderFulfillStockFormsetData;
  confirmButtonState: ConfirmButtonTransitionState;
  onSubmit: () => void;
  onClose: () => void;
}

const OrderFulfillStockExceededDialog: FC<OrderFulfillStockExceededDialogProps> = (props) => {
  const { lines, open, formsetData, confirmButtonState, onClose, onSubmit } = props;

  const styles = useStyles(props);

  const exceededLines = lines?.filter((el) => {
    const line = 'orderLine' in el ? el.orderLine : el;
    const lineFormWarehouse = formsetData?.find((item) => item.id === el.id)?.value?.[0]
      ?.warehouse;
    const stock = line.variant?.stocks.find(
      (stock) => stock.warehouse.id === lineFormWarehouse?.id
    );

    return (
      getFulfillmentFormsetQuantity(formsetData, line) >
      getOrderLineAvailableQuantity(line, stock)
    );
  });

  return (
    <>
      <ActionDialog
        open={open}
        title={m.dashboard_title() ?? 'Not enough stock'}
        onConfirm={onSubmit}
        onClose={onClose}
        confirmButtonState={confirmButtonState}
        maxWidth="sm"
        confirmButtonLabel={m.dashboard_ulfillButton() ?? 'Fulfill anyway'}
      >
        <Typography>
          {m.dashboard_nfoLabel() ??
            'Stock for items shown below are not enough to prepare fulfillment:'}
        </Typography>
        <CardSpacer />
        <div className={styles.scrollable ?? ''}>
          <ResponsiveTable className={styles.table ?? ''}>
            {!!lines?.length && (
              <TableHead>
                <TableRow>
                  <TableCell className={styles.colName ?? ''}>
                    {m.dashboard_productLabel() ?? 'Product'}
                  </TableCell>
                  <TableCell className={styles.colQuantity ?? ''}>
                    {m.dashboard_equiredStockLabel() ?? 'Required'}
                  </TableCell>
                  <TableCell className={styles.colWarehouseStock ?? ''}>
                    {m.dashboard_warehouseStockLabel() ?? 'Warehouse stock'}
                  </TableCell>
                </TableRow>
              </TableHead>
            )}

            <TableBody>
              {renderCollection(exceededLines, (line) => {
                const lineFormWarehouse = formsetData?.find((item) => item.id === line.id)
                  ?.value?.[0]?.warehouse;

                return (
                  <OrderFulfillStockExceededDialogLine
                    key={line?.id}
                    line={line}
                    formsetData={formsetData}
                    warehouseId={lineFormWarehouse?.id}
                  />
                );
              })}
            </TableBody>
          </ResponsiveTable>
        </div>
        <CardSpacer />
        <Typography>
          {m.dashboard_uestionLabel() ??
            'Are you sure you want to fulfill those products anyway?'}
        </Typography>
      </ActionDialog>
    </>
  );
};

OrderFulfillStockExceededDialog.displayName = 'OrderFulfillStockExceededDialog';
export default OrderFulfillStockExceededDialog;
