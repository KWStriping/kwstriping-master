import { useTranslation } from '@core/i18n';
import useNotifier from '@core/ui/hooks/useNotifier';
import { renderCollection } from '@core/ui/utils';
import { useMutation } from '@core/urql/hooks';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import OrderFulfillmentTable from '@dashboard/components/orders/OrderFulfillmentTable';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import type {
  OrderFulfillDataQuery,
  OrderLineFragment,
  WarehouseFragment,
} from '@core/api/graphql';
import { FulfillOrderDocument } from '@core/api/graphql';

import { orderUrl } from '@dashboard/oldSrc/orders/urls';

import createMetadataUpdateHandler from '@dashboard/oldSrc/utils/handlers/metadataUpdateHandler';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import OrderCardTitle from '../OrderCardTitle';
import TableHeader from '../OrderProductsCardElements/OrderProductsCardHeader';
import TableLine from '../OrderProductsCardElements/OrderProductsTableRow';
import styles from './index.module.css';

interface OrderUnfulfilledProductsCardProps {
  order: OrderFulfillDataQuery['order'];
  showFulfillmentAction: boolean;
  lines: OrderLineFragment[];
  warehouses: Maybe<WarehouseFragment[]>;
}

const OrderUnfulfilledProductsCard: FC<OrderUnfulfilledProductsCardProps> = ({
  order,
  showFulfillmentAction,
  lines,
  warehouses,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const notify = useNotifier();

  const [fulfillOrder, fulfillOrderOpts] = useMutation(FulfillOrderDocument, {
    onCompleted: (data) => {
      if (data?.fulfillOrder?.errors?.length === 0) {
        void router.replace(orderUrl(order.id));
        notify(t('dashboard.fulfillment.fulfilledItems', 'Fulfilled Items'), { type: 'success' });
      } else {
        if (!data?.fulfillOrder?.errors?.every((err) => err.code === 'INSUFFICIENT_STOCK')) {
          handleNestedMutationErrors({ data, t, notify });
        }
      }
    },
    disableErrorHandling: true,
  });

  const handleSubmit = async (data: MetadataFormData) => {
    if (order?.status === OrderStatus.Unconfirmed) {
      await confirmOrder({ id: order?.id });
    }

    const update = createMetadataUpdateHandler(
      order,
      () => Promise.resolve([]),
      (variables) => updateMetadata({ ...variables }),
      (variables) => updatePrivateMetadata({ ...variables })
    );

    const result = await update(data);

    if (result.length === 0) {
      notify(t('dashboard.savedChanges', 'Saved changes'), {
        type: 'success',
      });
    }

    return result;
  };

  if (!lines.length) return null;

  return (
    <>
      <Card>
        <OrderCardTitle
          lines={lines}
          withStatus
          status="unfulfilled"
          className={styles.cardTitle ?? ''}
        />
        <CardContent>
          {showFulfillmentAction ? (
            <OrderFulfillmentTable order={order} warehouses={warehouses} />
          ) : (
            <>
              {notAllowedToFulfillUnpaid && (
                <Typography color="error" variant="caption">
                  {t(
                    'dashboard.cannotFulfillUnpaidOrder',
                    'Can’t fulfill until payment is captured'
                  )}
                </Typography>
              )}
              <ResponsiveTable className={styles.table ?? ''}>
                <TableHeader />
                <TableBody>
                  {renderCollection(lines, (line) => (
                    <TableLine key={line.id} isOrderLine line={line} />
                  ))}
                </TableBody>
              </ResponsiveTable>
            </>
          )}
        </CardContent>
      </Card>
      <CardSpacer />
    </>
  );
};

export default OrderUnfulfilledProductsCard;
