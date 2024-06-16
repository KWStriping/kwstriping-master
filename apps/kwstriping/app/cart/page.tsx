import type { Metadata } from 'next';
import CartPage from './cart';
import Layout from '@kwstriping/app/client/Layout';

export const metadata: Metadata = {
  title: 'Cart',
};

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <Layout>
      <CartPage />
    </Layout>
  );
}
