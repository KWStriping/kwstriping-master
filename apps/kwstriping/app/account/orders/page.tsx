import type { Metadata } from 'next';
import { OrdersDocument } from '@tempo/api/generated/graphql';
import { getClient } from '@tempo/api/client';
import OrdersPage from './orders';
import Layout from '@kwstriping/app/client/Layout';

export const metadata: Metadata = {
  title: 'Orders',
};

export default async function Page() {
  const client = getClient();
  const response = await client.query({ query: OrdersDocument });
  const data = response.data?.me;
  if (!data) return { notFound: true };
  return (
    <Layout>
      <OrdersPage data={data} />
    </Layout>
  );
}
