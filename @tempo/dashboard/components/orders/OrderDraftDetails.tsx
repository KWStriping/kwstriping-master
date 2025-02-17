import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import type {
  ChannelUsabilityDataQuery,
  OrderDetailsFragment,
  OrderErrorFragment,
  OrderLineInput,
} from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { FC } from 'react';

import OrderDraftDetailsProducts from './OrderDraftDetailsProducts';
import OrderDraftDetailsSummary from './OrderDraftDetailsSummary';
import { OrderDiscountContext } from '@tempo/dashboard/components/products/OrderDiscountProviders/OrderDiscountProvider';
import type { OrderDiscountContextConsumerProps } from '@tempo/dashboard/components/products/OrderDiscountProviders/OrderDiscountProvider';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

interface OrderDraftDetailsProps {
  order: Maybe<OrderDetailsFragment>;
  channelUsabilityData?: ChannelUsabilityDataQuery;
  errors: OrderErrorFragment[];
  onOrderLineAdd: () => void;
  onOrderLineChange: (id: string, data: OrderLineInput) => void;
  onOrderLineRemove: (id: string) => void;
  onShippingMethodEdit: () => void;
}

const OrderDraftDetails: FC<OrderDraftDetailsProps> = ({
  order,
  channelUsabilityData,
  errors,
  onOrderLineAdd,
  onOrderLineChange,
  onOrderLineRemove,
  onShippingMethodEdit,
}) => {
  const isChannelActive = order?.channel.isActive;
  const areProductsInChannel = !!channelUsabilityData?.products.totalCount;

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard__wvf_() ?? 'Order Details'
          // section header
        }
        toolbar={
          isChannelActive &&
          areProductsInChannel && (
            <Button color="secondary" onClick={onOrderLineAdd} data-test-id="add-products-button">
              <>
                {/* button */}

                {m.dashboard___ahv() ?? 'Add products'}
              </>
            </Button>
          )
        }
      />
      <OrderDraftDetailsProducts
        order={order}
        errors={errors}
        onOrderLineChange={onOrderLineChange}
        onOrderLineRemove={onOrderLineRemove}
      />
      {order.lines.length !== 0 && (
        <CardContent>
          <OrderDiscountContext.Consumer>
            {(orderDiscountProps: OrderDiscountContextConsumerProps) => (
              <OrderDraftDetailsSummary
                order={order}
                errors={errors}
                onShippingMethodEdit={onShippingMethodEdit}
                {...orderDiscountProps}
              />
            )}
          </OrderDiscountContext.Consumer>
        </CardContent>
      )}
    </Card>
  );
};
OrderDraftDetails.displayName = 'OrderDraftDetails';
export default OrderDraftDetails;
