import type { Metadata } from 'next';
import Layout from '@kwstriping/app/client/Layout';
import OrderPage from './order';

export const metadata: Metadata = {
  title: 'Orders',
};

export default async function Page({ params: { id } }: { params: { id: string } }) {
  // const order = await getClient().query(OrderByIdDocument, { id }).toPromise();
  const order = null;
  return (
    <Layout>
      <OrderPage order={order} />
    </Layout>
  );
}
