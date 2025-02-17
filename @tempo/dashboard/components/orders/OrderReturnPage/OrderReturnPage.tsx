import * as m from '@paraglide/messages';
import { Trans } from '@tempo/next/i18n';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { renderCollection } from '@tempo/ui/utils';
import Grid from '@tempo/ui/components/Grid';
import type { OrderDetailsFragment, OrderErrorFragment } from '@tempo/api/generated/graphql';
import Container from '@mui/material/Container';
import { Fragment } from 'react';
import type { FC } from 'react';

import OrderAmount from '../OrderRefundReturnAmount';
import { getReturnProductsAmountValues } from '../OrderRefundReturnAmount/utils';
import type { OrderRefundSubmitData } from './form';
import OrderRefundForm from './form';
import ItemsCard from './OrderReturnRefundItemsCard/ReturnItemsCard';
import {
  getFulfilledFulfillemnts,
  getParsedLines,
  getUnfulfilledLines,
  getWaitingFulfillments,
} from './utils';
import { orderUrl } from '@tempo/dashboard/oldSrc/orders/urls';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';

const messages = {
  appTitle: {
    id: 'rVIlBs',
    defaultMessage: 'Order #{{orderNumber}}',
    description: 'page header with order number',
  },
  pageTitle: {
    id: 'BBIQxQ',
    defaultMessage: 'Order no. {orderNumber} - Replace/Return',
    description: 'page header',
  },
};

export interface OrderReturnPageProps {
  order: Maybe<OrderDetailsFragment>;
  loading: boolean;
  errors?: Maybe<OrderErrorFragment[]>;
  onSubmit: (data: OrderRefundSubmitData) => SubmitPromise;
}

const OrderRefundPage: FC<OrderReturnPageProps> = (props) => {
  const { order, loading, errors = [], onSubmit } = props;

  return (
    <OrderRefundForm order={order} onSubmit={onSubmit}>
      {({ data, handlers, change, submit, isSaveDisabled }) => (
        <Container>
          <Backlink href={orderUrl(order?.id)}>
            <Trans t={t} i18nKey={'appTitle'} orderNumber={order?.number}>
              {messages.appTitle.defaultMessage}
            </Trans>
          </Backlink>
          <PageHeader
            title={
              m.dashboard_pageTitle({
                orderNumber: order?.number,
              }) ?? 'Order no. {{orderNumber}} - Replace/Return'
            }
          />
          <Grid>
            <div>
              {!!data?.unfulfilledItemsQuantities?.length && (
                <>
                  <ItemsCard
                    errors={errors}
                    order={order}
                    lines={getUnfulfilledLines(order)}
                    itemsQuantities={data?.unfulfilledItemsQuantities}
                    itemsSelections={data?.itemsToBeReplaced}
                    onChangeQuantity={handlers.changeUnfulfiledItemsQuantity}
                    onSetMaxQuantity={handlers.handleSetMaximalUnfulfiledItemsQuantities}
                    onChangeSelected={handlers.changeItemsToBeReplaced}
                  />
                  <CardSpacer />
                </>
              )}
              {renderCollection(getWaitingFulfillments(order), ({ id, lines }) => (
                <Fragment key={id}>
                  <ItemsCard
                    errors={errors}
                    order={order}
                    fulfilmentId={id}
                    lines={getParsedLines(lines)}
                    itemsQuantities={data?.waitingItemsQuantities}
                    itemsSelections={data?.itemsToBeReplaced}
                    onChangeQuantity={handlers.changeWaitingItemsQuantity}
                    onSetMaxQuantity={handlers.handleSetMaximalItemsQuantities(id)}
                    onChangeSelected={handlers.changeItemsToBeReplaced}
                  />
                  <CardSpacer />
                </Fragment>
              ))}
              {renderCollection(getFulfilledFulfillemnts(order), ({ id, lines }) => (
                <Fragment key={id}>
                  <ItemsCard
                    errors={errors}
                    order={order}
                    fulfilmentId={id}
                    lines={getParsedLines(lines)}
                    itemsQuantities={data?.fulfilledItemsQuantities}
                    itemsSelections={data?.itemsToBeReplaced}
                    onChangeQuantity={handlers.changeFulfiledItemsQuantity}
                    onSetMaxQuantity={handlers.handleSetMaximalItemsQuantities(id)}
                    onChangeSelected={handlers.changeItemsToBeReplaced}
                  />
                  <CardSpacer />
                </Fragment>
              ))}
            </div>
            <div>
              <OrderAmount
                allowNoRefund
                isReturn
                amountData={getReturnProductsAmountValues(order, data)}
                data={data}
                order={order}
                disableSubmitButton={isSaveDisabled}
                disabled={loading}
                errors={errors}
                onChange={change}
                onRefund={submit}
              />
            </div>
          </Grid>
        </Container>
      )}
    </OrderRefundForm>
  );
};

export default OrderRefundPage;
