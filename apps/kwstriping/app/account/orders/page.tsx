import type { Metadata } from 'next';
import Layout from '@kwstriping/app/client/Layout';
import type { OrdersQuery, OrdersQueryVariables } from '@tempo/api/generated/graphql';
import { OrdersDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';
import OrdersPage from './orders';

export const metadata: Metadata = {
  title: 'Orders',
};

export default async function Page() {
  const client = getClient();
  const response = await client
    .query<OrdersQuery, OrdersQueryVariables>(OrdersDocument, {})
    .toPromise();
  const data = response.data?.me;
  if (!data) return { notFound: true };
  return (
    <Layout>
      <OrdersPage data={data} />
    </Layout>
  );
}
