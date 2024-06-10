import { useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import { renderCollection } from '@core/ui/utils';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import Grid from '@core/ui/components/Grid';
import PageHeader from '@dashboard/components/core/PageHeader';
import { FulfillmentStatus } from '@core/api/constants';
import type { OrderErrorFragment, OrderRefundDataQuery } from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import { orderUrl } from '@dashboard/oldSrc/orders/urls';
import Container from '@mui/material/Container';
import { Fragment } from 'react';
import type { FC } from 'react';

import OrderRefund from '../OrderRefund';
import OrderRefundFulfilledProducts from '../OrderRefundFulfilledProducts';
import OrderRefundAmount from '../OrderRefundReturnAmount';
import {
  getMiscellaneousAmountValues,
  getRefundProductsAmountValues,
} from '../OrderRefundReturnAmount/utils';
import OrderRefundUnfulfilledProducts from '../OrderRefundUnfulfilledProducts';
import type { OrderRefundSubmitData } from './form';
import OrderRefundForm, { OrderRefundType } from './form';

export const refundFulfilledStatuses = [
  FulfillmentStatus.Fulfilled,
  FulfillmentStatus.Returned,
  FulfillmentStatus.WaitingForApproval,
];

export interface OrderRefundPageProps {
  order: OrderRefundDataQuery['order'];
  defaultType?: OrderRefundType;
  disabled: boolean;
  errors: OrderErrorFragment[];
  onSubmit: (data: OrderRefundSubmitData) => SubmitPromise;
}

const OrderRefundPage: FC<OrderRefundPageProps> = (props) => {
  const {
    order,
    defaultType = OrderRefundType.ProductS,
    disabled,
    errors = [],
    onSubmit,
  } = props;

  const { t } = useTranslation();

  const unfulfilledLines = order?.lines.filter((line) => line.quantityToFulfill > 0);

  const fulfilledFulfillemnts =
    order?.fulfillments.filter(({ status }) => refundFulfilledStatuses.includes(status)) || [];

  return (
    <OrderRefundForm
      order={order}
      defaultType={defaultType}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      {({ data, handlers, change, submit, isSaveDisabled }) => {
        const isProductRefund = data?.type === OrderRefundType.ProductS;

        return (
          <Container>
            <Backlink href={orderUrl(order?.id)}>
              {order?.number
                ? t('dashboard.VIlBs', 'Order #{{orderNumber}}', {
                    orderNumber: order.number,
                  })
                : t(
                    'dashboard.u4K7e',
                    'Order'
                    // page header
                  )}
            </Backlink>
            <PageHeader
              title={t('dashboard.krqBj', 'Order no. {orderNumber} - Refund', {
                orderNumber: order?.number,
              })}
            />
            <Grid>
              <div>
                <OrderRefund data={data} disabled={disabled} onChange={change} />
                {isProductRefund && (
                  <>
                    {!!unfulfilledLines?.length && (
                      <>
                        <CardSpacer />
                        <OrderRefundUnfulfilledProducts
                          unfulfilledLines={unfulfilledLines}
                          data={data}
                          disabled={disabled}
                          onRefundedProductQuantityChange={handlers.changeRefundedProductQuantity}
                          onSetMaximalQuantities={handlers.setMaximalRefundedProductQuantities}
                        />
                      </>
                    )}
                    {renderCollection(fulfilledFulfillemnts, (fulfillment) => (
                      <Fragment key={fulfillment?.id}>
                        <CardSpacer />
                        <OrderRefundFulfilledProducts
                          fulfillment={fulfillment}
                          data={data}
                          disabled={disabled}
                          orderNumber={order?.number}
                          onRefundedProductQuantityChange={
                            handlers.changeRefundedFulfilledProductQuantity
                          }
                          onSetMaximalQuantities={() =>
                            handlers.setMaximalRefundedFulfilledProductQuantities(fulfillment?.id)
                          }
                        />
                      </Fragment>
                    ))}
                  </>
                )}
              </div>
              <div>
                <OrderRefundAmount
                  amountData={
                    isProductRefund
                      ? getRefundProductsAmountValues(order, data)
                      : getMiscellaneousAmountValues(order)
                  }
                  data={data}
                  order={order}
                  disabled={isSaveDisabled}
                  errors={errors}
                  onChange={change}
                  onRefund={submit}
                />
              </div>
            </Grid>
          </Container>
        );
      }}
    </OrderRefundForm>
  );
};
OrderRefundPage.displayName = 'OrderRefundPage';
export default OrderRefundPage;
