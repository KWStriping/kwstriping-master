import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { OrderDiscountContextConsumerProps } from '@dashboard/components/products/OrderDiscountProviders/OrderDiscountProvider';
import { OrderDiscountContext } from '@dashboard/components/products/OrderDiscountProviders/OrderDiscountProvider';
import type {
  ChannelUsabilityDataQuery,
  OrderDetailsFragment,
  OrderErrorFragment,
  OrderLineInput,
} from '@core/api/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { FC } from 'react';

import OrderDraftDetailsProducts from './OrderDraftDetailsProducts';
import OrderDraftDetailsSummary from './OrderDraftDetailsSummary';

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
  const { t } = useTranslation();

  const isChannelActive = order?.channel.isActive;
  const areProductsInChannel = !!channelUsabilityData?.products.totalCount;

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.8wvf7',
          'Order Details'
          // section header
        )}
        toolbar={
          isChannelActive &&
          areProductsInChannel && (
            <Button color="secondary" onClick={onOrderLineAdd} data-test-id="add-products-button">
              <>
                {/* button */}

                {t('dashboard.50ahv', 'Add products')}
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
