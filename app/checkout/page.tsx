import type { Metadata } from 'next';
import CheckoutPage from './checkout';

export const metadata: Metadata = {
  title: 'Checkout',
};

export default async function Page({ params }: { params: { locale: string } }) {
  return <CheckoutPage />;
}
