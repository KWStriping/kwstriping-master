'use client';

import Divider from '@mui/material/Divider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from '@tempo/ui/components/Spinner';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import { usePaths } from '@kwstriping/hooks/usePaths';
import Checkout from '@kwstriping/components/Checkout';

export default function CheckoutPage() {
  const router = useRouter();
  const paths = usePaths();
  const { checkout, loading: fetching } = useCheckout();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to cart if theres no checkout data
    if (!fetching && !!checkout) {
      setLoading(false);
    }
  }, [checkout, fetching, paths, router]);

  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (!checkout || checkout.lines?.length === 0) {
    return null;
  }

  return (
    <main className={'sm:w-[50%] max-w-screen-md bg-white/90 my-6 p-4'}>
      <h1 className={'text-center font-semibold'}>{'Service Request'}</h1>
      <Divider />
      <Checkout checkout={checkout} />
    </main>
  );
}
