import type { Metadata } from 'next';
import OrderPage from './order';
import { OrderDocument } from '@tempo/api/generated/graphql';

import { query } from '@tempo/api/server';
import Layout from '@kwstriping/app/ServerLayout';
import { auth } from '@tempo/api/auth';

export const metadata: Metadata = {
  title: 'Orders',
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session) return null;
  const response = await query({ query: OrderDocument, variables: { id } });
  const order = response.data?.order;
  if (!order) return { notFound: true };
  return (
    <Layout>
      <OrderPage order={order} />
    </Layout>
  );
}
