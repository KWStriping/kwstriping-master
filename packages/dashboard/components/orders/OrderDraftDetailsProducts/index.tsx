import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import TableLine from './TableLine';
import getOrderErrorMessage from '@dashboard/oldSrc/utils/errors/order';
import type { OrderDetailsFragment, OrderErrorFragment } from '@core/api/graphql';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import { OrderLineDiscountConsumer } from '@dashboard/components/products/OrderDiscountProviders/OrderLineDiscountProvider';
import type { OrderLineDiscountContextConsumerProps } from '@dashboard/components/products/OrderDiscountProviders/OrderLineDiscountProvider';

export interface FormData {
  quantity: number;
}

const useStyles = makeStyles(
  (theme) => ({
    colAction: {
      width: theme.spacing(10),
    },
    colName: {
      width: 'auto',
    },
    colNameLabel: {},
    colPrice: {},
    colQuantity: {},
    colTotal: {},
    skeleton: {
      margin: theme.spacing(0, 4),
    },
    errorInfo: {
      color: theme.vars.palette.error.main,
      marginLeft: theme.spacing(1.5),
      display: 'inline',
    },
    quantityField: {
      '& input': {
        padding: '12px 12px 10px',
      },
      width: 60,
    },
    table: {
      [theme.breakpoints.up('md')]: {
        tableLayout: 'auto',
      },
      tableLayout: 'auto',
    },
  }),
  { name: 'OrderDraftDetailsProducts' }
);

interface OrderDraftDetailsProductsProps {
  order?: Maybe<OrderDetailsFragment>;
  errors: OrderErrorFragment[];
  onOrderLineChange: (id: string, data: FormData) => void;
  onOrderLineRemove: (id: string) => void;
}

const OrderDraftDetailsProducts: FC<OrderDraftDetailsProductsProps> = (props) => {
  const { order, errors, onOrderLineChange, onOrderLineRemove } = props;
  // const styles = useStyles();
  const styles = {};
  const lines = order?.lines ?? [];

  const { t } = useTranslation();

  const formErrors = errors?.filter((error) => error.field === 'lines');

  if (order === undefined) {
    return <Skeleton className={styles.skeleton ?? ''} />;
  }

  return (
    <ResponsiveTable className={styles.table ?? ''}>
      {!!lines.length && (
        <TableHead>
          <TableRow>
            <TableCell className={styles.colName ?? ''} colSpan={2}>
              <span className={styles.colNameLabel ?? ''}>{t('dashboard./ZVlU', 'Product')}</span>
            </TableCell>
            <TableCell className={styles.colQuantity ?? ''}>
              <>
                {t(
                  'dashboard.EWp+k',
                  'Quantity'
                  // quantity of ordered products
                )}
              </>
            </TableCell>
            <TableCell className={styles.colPrice ?? ''}>
              <>
                {/* price or ordered products */}

                {t('dashboard.2dfzI', 'Price')}
              </>
            </TableCell>
            <TableCell className={styles.colTotal ?? ''}>
              <>
                {/* total price of ordered products */}

                {t('dashboard.Vwmf5', 'Total')}
              </>
            </TableCell>
            <TableCell className={styles.colAction ?? ''} />
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        {lines.length ? (
          renderCollection(lines, (line) => (
            <OrderLineDiscountConsumer key={line.id} orderLineId={line.id}>
              {(orderLineDiscountProps: OrderLineDiscountContextConsumerProps) => (
                <TableLine
                  {...orderLineDiscountProps}
                  line={line}
                  error={formErrors.find(
                    (error) => error.orderLines?.some((id) => id === line.id)
                  )}
                  onOrderLineChange={onOrderLineChange}
                  onOrderLineRemove={onOrderLineRemove}
                />
              )}
            </OrderLineDiscountConsumer>
          ))
        ) : (
          <>
            <TableRow>
              <TableCell colSpan={5}>
                {t('dashboard.D7/q8', 'No Products added to Order')}
                {!!formErrors.length && (
                  <Typography variant="body2" className={styles.errorInfo ?? ''}>
                    {getOrderErrorMessage(formErrors[0], t)}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          </>
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
OrderDraftDetailsProducts.displayName = 'OrderDraftDetailsProducts';
export default OrderDraftDetailsProducts;
