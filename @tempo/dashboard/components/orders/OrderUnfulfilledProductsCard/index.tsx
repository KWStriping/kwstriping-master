import type { FulfillOrderMutation, FulfillOrderMutationVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import useNotifier from '@tempo/ui/hooks/useNotifier';
import { renderCollection } from '@tempo/ui/utils';
import { useMutation } from '@tempo/api/hooks';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import OrderFulfillmentTable from '@tempo/dashboard/components/orders/OrderFulfillmentTable';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import type {
  OrderFulfillDataQuery,
  OrderLineFragment,
  WarehouseFragment,
} from '@tempo/api/generated/graphql';
import { FulfillOrderDocument } from '@tempo/api/generated/graphql';

import { orderUrl } from '@tempo/dashboard/oldSrc/orders/urls';

import createMetadataUpdateHandler from '@tempo/dashboard/oldSrc/utils/handlers/metadataUpdateHandler';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const notify = useNotifier();

  const [fulfillOrder, fulfillOrderOpts] = useMutation(FulfillOrderDocument, {
    onCompleted: (data) => {
      if (data?.fulfillOrder?.errors?.length === 0) {
        void router.replace(orderUrl(order.id));
        notify(m.dashboard_fulfillment_fulfilledItems() ?? 'Fulfilled Items', {
          type: 'success',
        });
      } else {
        if (!data?.fulfillOrder?.errors?.every((err) => err.code === 'INSUFFICIENT_STOCK')) {
          handleNestedMutationErrors({ data, notify });
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
      notify(m.dashboard_savedChanges() ?? 'Saved changes', {
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
                  {m.dashboard_cannotFulfillUnpaidOrder() ??
                    'Can’t fulfill until payment is captured'}
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
