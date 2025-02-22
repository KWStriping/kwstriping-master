import { renderCollection } from '@tempo/ui/utils';
import { FulfillmentStatus } from '@tempo/api/generated/constants';
import type { OrderDetailsFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import type { FC } from 'react';

import OrderCardTitle from '../OrderCardTitle';
import TableHeader from '../OrderProductsCardElements/OrderProductsCardHeader';
import TableLine from '../OrderProductsCardElements/OrderProductsTableRow';
import ActionButtons from './ActionButtons';
import ExtraInfoLines from './ExtraInfoLines';
import { mergeRepeatedOrderLines } from '@tempo/dashboard/oldSrc/orders/utils/data';
import TrashIcon from '@tempo/dashboard/oldSrc/icons/Trash';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';

interface OrderFulfilledProductsCardProps {
  fulfillment: OrderDetailsFragment['fulfillments'][0];
  fulfillmentAllowUnpaid: boolean;
  order?: Maybe<OrderDetailsFragment>;
  onOrderFulfillmentApprove: () => void;
  onOrderFulfillmentCancel: () => void;
  onTrackingCodeAdd: () => void;
  onRefund: () => void;
}

const statusesToMergeLines = [
  FulfillmentStatus.Refunded,
  FulfillmentStatus.RefundedAndReturned,
  FulfillmentStatus.Returned,
  FulfillmentStatus.Replaced,
];
const cancelableStatuses = [FulfillmentStatus.Fulfilled, FulfillmentStatus.WaitingForApproval];

const OrderFulfilledProductsCard: FC<OrderFulfilledProductsCardProps> = (props) => {
  const {
    fulfillment,
    fulfillmentAllowUnpaid,
    order,
    onOrderFulfillmentApprove,
    onOrderFulfillmentCancel,
    onTrackingCodeAdd,
    onRefund,
  } = props;
  const styles = useStyles(props);

  if (!fulfillment) return null;

  const getLines = () => {
    if (statusesToMergeLines.includes(fulfillment?.status)) {
      return mergeRepeatedOrderLines(fulfillment.lines);
    }

    return fulfillment?.lines || [];
  };

  return (
    <>
      <Card>
        <OrderCardTitle
          withStatus
          lines={fulfillment?.lines}
          fulfillmentOrder={fulfillment?.fulfillmentOrder}
          status={fulfillment?.status}
          warehouseName={fulfillment?.warehouse?.name}
          orderNumber={order?.number}
          toolbar={
            cancelableStatuses.includes(fulfillment?.status) && (
              <IconButton
                color="secondary"
                className={styles.deleteIcon ?? ''}
                onClick={onOrderFulfillmentCancel}
                data-test-id="cancel-fulfillment-button"
              >
                <TrashIcon />
              </IconButton>
            )
          }
        />
        <CardContent>
          <ResponsiveTable className={styles.table ?? ''}>
            <TableHeader />
            <TableBody>
              {renderCollection(getLines(), (line) => (
                <TableLine key={line.id} line={line} />
              ))}
            </TableBody>
            <ExtraInfoLines fulfillment={fulfillment} />
          </ResponsiveTable>
          <ActionButtons
            status={fulfillment?.status}
            trackingNumber={fulfillment?.trackingNumber}
            orderIsPaid={order?.isPaid}
            fulfillmentAllowUnpaid={fulfillmentAllowUnpaid}
            onTrackingCodeAdd={onTrackingCodeAdd}
            onRefund={onRefund}
            onApprove={onOrderFulfillmentApprove}
          />
        </CardContent>
      </Card>
      <CardSpacer />
    </>
  );
};

export default OrderFulfilledProductsCard;
