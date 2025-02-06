import type { Metadata } from 'next';
import { OrderDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/client';
import OrderPage from './order';
import Layout from '@kwstriping/app/client/Layout';

export const metadata: Metadata = {
  title: 'Orders',
};

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const client = getClient();
  const response = await client.query({ query: OrderDocument, variables: { id } });
  const order = response.data?.order;
  if (!order) return { notFound: true };
  return (
    <Layout>
      <OrderPage order={order} />
    </Layout>
  );
}
