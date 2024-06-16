'use client';

import { useUser } from '@tempo/api/auth/react/hooks';

import { useAuthorizedQuery } from '@tempo/api/hooks/useQuery';
import { getUserName } from '@tempo/utils/user';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { OrderStatusFilter, StockAvailability } from '@tempo/api/generated/constants';
import { gql } from '@tempo/api';
import HomePage from '@tempo/dashboard/components/home/HomePage';
import useAppChannel from '@tempo/dashboard/components/layout/Layout/AppChannelContext';

import { getDatePeriod } from '@tempo/dashboard/oldSrc/misc';
import { orderListUrl } from '@tempo/dashboard/oldSrc/orders/urls';
import { productListUrl } from '@tempo/dashboard/oldSrc/products/urls';

export const homeQuery = gql(`
  query Home(
    $channel: String!
    $datePeriod: DateRangeInput!
    $PERMISSION_MANAGE_PRODUCTS: Boolean!
    $PERMISSION_MANAGE_ORDERS: Boolean!
  ) {
    salesToday: ordersTotal(period: TODAY, channel: $channel)
      @include(if: $PERMISSION_MANAGE_ORDERS) {
      gross {
        amount
        currency
      }
    }
    ordersToday: orders(filters: { created: $datePeriod }, channel: $channel)
      @include(if: $PERMISSION_MANAGE_ORDERS) {
      totalCount
    }
    ordersToConfirm: orders(filters: { status: UNCONFIRMED }, channel: $channel)
      @include(if: $PERMISSION_MANAGE_ORDERS) {
      totalCount
    }
    ordersToFulfill: orders(filters: { status: READY_TO_FULFILL }, channel: $channel)
      @include(if: $PERMISSION_MANAGE_ORDERS) {
      totalCount
    }
    ordersToCapture: orders(filters: { status: READY_TO_CAPTURE }, channel: $channel)
      @include(if: $PERMISSION_MANAGE_ORDERS) {
      totalCount
    }
    productsOutOfStock: products(
      filters: { stockAvailability: OUT_OF_STOCK }
      channel: $channel
    ) {
      totalCount
    }
    productTopToday: reportProductSales(period: TODAY, first: 5, channel: $channel)
      @include(if: $PERMISSION_MANAGE_PRODUCTS) {
      edges {
        node {
          ...TopProduct
        }
      }
    }
    activities: homepageEvents(last: 10) @include(if: $PERMISSION_MANAGE_ORDERS) {
      edges {
        node {
          ...Activity
          amount
          date
          email
          emailType
          id
          message
          orderNumber
          oversoldItems
          quantity
        }
      }
    }
  }
`);

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const [client, ssrExchange] = getClientAndSsrExchange(ctx);
//   if (!ctx) throw new Error('No ctx');
//   await client.query(homeQuery, {}).;
//   return {
//     props: generateStaticRenderingProps(ssrExchange),
//   };
// };

const Home = () => {
  console.log('>>>>>>> Home');
  const { user } = useUser();
  const { channel } = useAppChannel();
  const { data } = useAuthorizedQuery(homeQuery, {
    pause: !channel,
    variables: { channel: channel?.slug as string, datePeriod: getDatePeriod(1) },
  });
  const noChannel = !channel && typeof channel !== 'undefined';
  console.log('>>> data', data);
  if (!data || !channel || !user) return null; // TODO: add loading state
  return (
    <HomePage
      activities={data?.activities ? mapEdgesToItems(data?.activities).reverse() : []}
      orders={data?.ordersToday?.totalCount ?? null}
      sales={data?.salesToday?.gross}
      topProducts={data?.productTopToday ? mapEdgesToItems(data?.productTopToday) : []}
      createNewChannelHref={'/channels'}
      ordersToCaptureHref={orderListUrl({
        status: [OrderStatusFilter.ReadyToCapture],
        channel: [channel?.id],
      })}
      ordersToConfirmHref={orderListUrl({
        status: [OrderStatusFilter.Unconfirmed],
        channel: [channel?.id],
      })}
      ordersToFulfillHref={orderListUrl({
        status: [OrderStatusFilter.ReadyToFulfill],
        channel: [channel?.id],
      })}
      productsOutOfStockHref={productListUrl({
        stockStatus: StockAvailability.OutOfStock,
        channel: channel?.slug,
      })}
      ordersToConfirm={data?.ordersToConfirm?.totalCount}
      ordersToCapture={data?.ordersToCapture?.totalCount}
      ordersToFulfill={data?.ordersToFulfill?.totalCount}
      productsOutOfStock={data?.productsOutOfStock?.totalCount}
      userName={getUserName(user, true)}
      noChannel={noChannel}
    />
  );
};

export default Home;
