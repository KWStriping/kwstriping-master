import type { Metadata } from 'next';
import CheckoutPage from './checkout';
import Layout from '@kwstriping/app/ServerLayout';

export const metadata: Metadata = {
  title: 'Checkout',
};

export default async function Page({ params }: { params: { locale: string } }) {
  return (
    <Layout>
      <CheckoutPage />
    </Layout>
  );
}
