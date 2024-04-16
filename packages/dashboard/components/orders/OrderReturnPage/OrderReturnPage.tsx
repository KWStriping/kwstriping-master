import { Trans, useTranslation } from '@core/i18n';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import { renderCollection } from '@core/ui/utils';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import Grid from '@core/ui/components/Grid';
import PageHeader from '@dashboard/components/core/PageHeader';
import type { OrderDetailsFragment, OrderErrorFragment } from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import { orderUrl } from '@dashboard/oldSrc/orders/urls';
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

  const { t } = useTranslation();
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
            title={t('dashboard.pageTitle', 'Order no. {{orderNumber}} - Replace/Return', {
              orderNumber: order?.number,
            })}
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
