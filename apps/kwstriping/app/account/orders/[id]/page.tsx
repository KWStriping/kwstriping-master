import type { Metadata } from 'next';
import Layout from '@kwstriping/app/client/Layout';
import type { OrderQuery, OrderQueryVariables } from '@tempo/api/generated/graphql';
import { OrderDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/server';
import OrderPage from './order';

export const metadata: Metadata = {
  title: 'Orders',
};

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const client = getClient();
  const response = await client
    .query<OrderQuery, OrderQueryVariables>(OrderDocument, { id })
    .toPromise();
  const order = response.data?.order;
  if (!order) return { notFound: true };
  return (
    <Layout>
      <OrderPage order={order} />
    </Layout>
  );
}
