import { useTranslation } from '@core/i18n';
import { useShopSettings } from '@core/ui';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { useMutation, useQuery } from '@core/urql/hooks';
import Grid from '@core/ui/components/Grid';

import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';

import OrderCustomer from '../OrderCustomer';
import OrderCustomerNote from '../OrderCustomerNote';
import OrderFulfilledProductsCard from '../OrderFulfilledProductsCard';
import OrderHistory from '../OrderHistory';
import OrderInvoiceList from '../OrderInvoiceList';
import OrderPayment from '../OrderPayment';
import OrderUnfulfilledProductsCard from '../OrderUnfulfilledProductsCard';
import { useStyles } from './styles';
import Title from './Title';
import { filteredConditionalItems, hasAnyItemsReplaceable } from './utils';
import {
  OrderCancelDocument,
  OrderFulfillmentApproveDocument,
  OrderUpdateDocument,
  CustomerAddressesDocument,
  WarehouseListDocument,
} from '@core/api/graphql';
import type { OrderDetailsFragment, OrderErrorFragment } from '@core/api/graphql';
import { OrderStatus } from '@core/api/constants';
import OrderChannelSectionCard from '@dashboard/components/orders/OrderChannelSectionCard';
import PageHeader from '@dashboard/components/core/PageHeader';
import Metadata from '@dashboard/components/core/Metadata';
import FormattedDateTime from '@dashboard/components/core/Date';
import CardMenu from '@dashboard/components/core/CardMenu';

export interface OrderDetailsPageProps {
  id: string;
  order: Maybe<OrderDetailsFragment>;
  loading: boolean;
  errors?: Maybe<OrderErrorFragment[]>;
}

const OrderDetailsPage: FC<OrderDetailsPageProps> = ({ id, order, loading: disabled }) => {
  const styles = useStyles({});
  const router = useRouter();
  const { enableMetadata } = useShopSettings();
  const { t } = useTranslation();
  const { autoApproveFulfillment, fulfillmentAllowUnpaid } = useShopSettings();
  const [{ data: warehousesData }] = useQuery(WarehouseListDocument, {
    displayLoader: true,
    variables: {
      first: 30,
    },
  });

  const warehouses = useMemo(
    () => mapEdgesToItems(warehousesData?.warehouses) || [],
    [warehousesData]
  );

  const [{ data: customerAddresses, fetching: customerAddressesLoading }] = useQuery(
    CustomerAddressesDocument,
    {
      variables: {
        id: order?.user?.id as string,
      },
      pause: !order?.user?.id,
    }
  );
  const [updateOrder, updateOrderMutationState] = useMutation(OrderUpdateDocument);

  const handleCustomerChangeAddresses = async (
    data: Partial<OrderCustomerAddressesEditDialogOutput>
  ): Promise<unknown> =>
    updateOrder({
      id,
      input: data,
    });

  const [transactionReference, setTransactionReference] = useState('');

  const [currentApproval, setCurrentApproval] = useState<ApprovalState | null>(null);
  const [stockExceeded, setStockExceeded] = useState(false);
  const [approveOrderFulfillment, approveOrderFulfillmentMutationState] = useMutation(
    OrderFulfillmentApproveDocument
  );

  const approvalErrors =
    approveOrderFulfillmentMutationState.data?.approveFulfillment?.errors || [];

  useEffect(() => {
    if (
      approvalErrors.length &&
      approvalErrors.every((err) => err.code === 'INSUFFICIENT_STOCK')
    ) {
      setStockExceeded(true);
    }
  }, [approvalErrors]);

  const errors = updateOrderMutationState.data?.updateOrder?.errors || [];

  const isOrderUnconfirmed = order?.status === OrderStatus.Unconfirmed;
  const canCancel = order?.status !== OrderStatus.Canceled;
  const canEditAddresses = order?.status !== OrderStatus.Canceled;
  const canFulfill = order?.status !== OrderStatus.Canceled;
  const notAllowedToFulfillUnpaid =
    autoApproveFulfillment && fulfillmentAllowUnpaid && !order?.isPaid;
  const unfulfilled = (order?.lines || []).filter((line) => line.quantityToFulfill > 0);

  const saveLabel = isOrderUnconfirmed
    ? { confirm: t('dashboard.onfirmOrder', 'Confirm order') }
    : undefined;

  const allowSave = () => {
    if (!isOrderUnconfirmed) {
      return disabled;
    } else if (!order?.lines?.length) {
      return true;
    }
    return disabled;
  };

  const [cancelOrder, cancelOrderMutationState] = useMutation(OrderCancelDocument);

  const selectCardMenuItems = filteredConditionalItems([
    {
      item: {
        label: t('dashboard.cancelOrder', 'Cancel order'),
        onSelect: () => cancelOrder({ id }),
      },
      shouldExist: canCancel,
    },
    {
      item: {
        label: t('dashboard.returnOrder', 'Return / Replace order'),
        onSelect: () => router.push(`/orders/${id}/replace`),
      },
      shouldExist: hasAnyItemsReplaceable(order),
    },
  ]);

  return (
    <Container>
      <Backlink href={'/orders'}>{t('dashboard.orders', 'Orders')}</Backlink>
      <PageHeader
        className={styles.header ?? ''}
        inline
        title={<Title order={order} />}
        cardMenu={<CardMenu menuItems={[...selectCardMenuItems]} />}
      />
      <div className={styles.date ?? ''}>
        {order && order.created ? (
          <Typography variant="body2">
            <FormattedDateTime date={order.created} />
          </Typography>
        ) : (
          <Skeleton style={{ width: '10em' }} />
        )}
      </div>
      <Grid>
        <div data-test-id="order-fulfillment">
          <OrderUnfulfilledProductsCard
            order={order}
            showFulfillmentAction={canFulfill}
            lines={unfulfilled}
            warehouses={warehouses}
          />
          {order?.fulfillments?.map((fulfillment) => (
            <Fragment key={fulfillment.id}>
              <OrderFulfilledProductsCard fulfillment={fulfillment} order={order} />
            </Fragment>
          ))}
          <OrderPayment order={order} />
          {enableMetadata && <Metadata data={data} onChange={changeMetadata} />}
          <OrderHistory history={order?.events} orderCurrency={order?.total?.gross.currency} />
        </div>
        <div>
          <OrderCustomer
            canEditAddresses={canEditAddresses}
            canEditCustomer={false}
            order={order}
            errors={errors}
          />

          <OrderChannelSectionCard channel={order?.channel} />

          {!isOrderUnconfirmed && <OrderInvoiceList invoices={order?.invoices} />}
          <OrderCustomerNote note={order?.customerNote} />
        </div>
      </Grid>
    </Container>
  );
};

OrderDetailsPage.displayName = 'OrderDetailsPage';
export default OrderDetailsPage;
