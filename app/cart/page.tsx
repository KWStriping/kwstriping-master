import type { Metadata } from 'next';
import CartPage from './cart';
import Layout from '@kwstriping/app/ServerLayout';

export const metadata: Metadata = {
  title: 'Cart',
};

export default async function Page() {
  return (
    <Layout>
      {/* TODO: Not yet implemented */}
      <CartPage displayPrices={false} />
    </Layout>
  );
}
