import type { Metadata } from 'next';
import Layout from '@kwstriping/app/client/Layout';
import CartPage from './cart';

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
