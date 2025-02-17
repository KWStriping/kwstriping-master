import type { Metadata } from 'next';
import OrdersPage from './orders';
import Layout from '@kwstriping/app/client/Layout';

export const metadata: Metadata = {
  title: 'Orders',
};

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <Layout>
      <OrdersPage />
    </Layout>
  );
}
