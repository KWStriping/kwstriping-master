'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import Spinner from '@tempo/ui/components/Spinner';
import Checkout from '@/components/Checkout';

function CheckoutPage() {
  const router = useRouter();
  const loading = false; // TODO
  const { checkout } = useCheckout();

  useEffect(() => {
    // Redirect to cart if theres no checkout data
    if (!loading && (!checkout || !checkout.lines?.length)) {
      void router.push('/');
    }
  });

  const isCheckoutLoading = loading || typeof window === 'undefined';
  if (isCheckoutLoading) {
    return <Spinner />;
  }

  if (!checkout || checkout.lines?.length === 0) {
    return null;
  }

  return (
    <main className={'max-w-screen-md flex bg-white/90 my-6'}>
      <Checkout checkout={checkout} />
    </main>
  );
}

export default CheckoutPage;
