import type { Metadata } from 'next';
import CheckoutPage from './checkout';
import Layout from '@/app/ServerLayout';

export const metadata: Metadata = {
  title: 'Checkout',
};

export default async function Page() {
  return (
    <Layout>
      <CheckoutPage />
    </Layout>
  );
}
