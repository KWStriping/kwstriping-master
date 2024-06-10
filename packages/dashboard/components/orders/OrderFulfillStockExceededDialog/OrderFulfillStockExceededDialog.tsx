import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { renderCollection } from '@core/ui/utils';
import { CardSpacer } from '@dashboard/components/core/CardSpacer';
import ActionDialog from '@dashboard/components/dialogs/ActionDialog';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import type { FulfillmentFragment, OrderFulfillmentLineFragment } from '@core/api/graphql';
import type { OrderFulfillStockFormsetData } from '@dashboard/oldSrc/orders/utils/data';
import {
  getFulfillmentFormsetQuantity,
  getOrderLineAvailableQuantity,
} from '@dashboard/oldSrc/orders/utils/data';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import OrderFulfillStockExceededDialogLine from '../OrderFulfillStockExceededDialogLine';
import { useStyles } from './styles';

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

  const { t } = useTranslation();
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
        title={t('dashboard.title', 'Not enough stock')}
        onConfirm={onSubmit}
        onClose={onClose}
        confirmButtonState={confirmButtonState}
        maxWidth="sm"
        confirmButtonLabel={t('dashboard.ulfillButton', 'Fulfill anyway')}
      >
        <Typography>
          {t(
            'dashboard.nfoLabel',
            'Stock for items shown below are not enough to prepare fulfillment:'
          )}
        </Typography>
        <CardSpacer />
        <div className={styles.scrollable ?? ''}>
          <ResponsiveTable className={styles.table ?? ''}>
            {!!lines?.length && (
              <TableHead>
                <TableRow>
                  <TableCell className={styles.colName ?? ''}>
                    {t('dashboard.productLabel', 'Product')}
                  </TableCell>
                  <TableCell className={styles.colQuantity ?? ''}>
                    {t('dashboard.equiredStockLabel', 'Required')}
                  </TableCell>
                  <TableCell className={styles.colWarehouseStock ?? ''}>
                    {t('dashboard.warehouseStockLabel', 'Warehouse stock')}
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
          {t('dashboard.uestionLabel', 'Are you sure you want to fulfill those products anyway?')}
        </Typography>
      </ActionDialog>
    </>
  );
};

OrderFulfillStockExceededDialog.displayName = 'OrderFulfillStockExceededDialog';
export default OrderFulfillStockExceededDialog;
