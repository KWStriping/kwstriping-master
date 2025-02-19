import type { Metadata } from 'next';
import OrdersPage from './orders';
import { OrdersDocument } from '@tempo/api/generated/graphql';
import { query } from '@tempo/api/server';
import Layout from '@/app/ServerLayout';
import { auth } from '@tempo/api/auth';

export const metadata: Metadata = {
  title: 'Orders',
};

export default async function Page() {
  const session = await auth();
  if (!session) return null;
  const response = await query({ query: OrdersDocument });
  const data = response.data?.me;
  if (!data) return { notFound: true };
  return (
    <Layout>
      <OrdersPage data={data} />
    </Layout>
  );
}
