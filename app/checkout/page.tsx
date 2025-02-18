import type { Metadata } from 'next';
import Layout from '@kwstriping/app/ServerLayout';

export const metadata: Metadata = {
  title: 'Checkout',
};

export default async function Page({ params: _ }: { params: { locale: string } }) {
  return (
    <Layout>
      Not yet implemented
      {/* <CheckoutPage /> */}
    </Layout>
  );
}
