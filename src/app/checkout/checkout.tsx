'use client';

import Divider from '@mui/material/Divider';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import Checkout from '@/components/Checkout';

export default function CheckoutPage() {
  const { checkout } = useCheckout();

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
