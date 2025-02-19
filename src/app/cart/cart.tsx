'use client';

import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { CartSummary } from '@tempo/checkout/components/CartSummary';
import { CheckoutProductList } from '@tempo/checkout/components/sidebar/CheckoutProductList';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';

import { Button } from '@tempo/ui/components/buttons/Button';

interface CartPageProps {
  displayPrices: boolean;
}

function CartPage({ displayPrices }: CartPageProps) {
  const { checkout } = useCheckout();

  return (
    <>
      <div className="w-full flex justify-center h-full items-center">
        <div className={'bg-white/90 p-10'}>
          {!checkout?.lines?.length ? (
            <>
              <h1 className="text-3xl font-bold my-8">Your cart is empty</h1>
              <p className="text-sm text-center">
                <Link href={{ pathname: '/products' }}>
                  <Button>{'Go to catalog'}</Button>
                </Link>
              </p>
            </>
          ) : (
            <>
              <Typography variant={'h1'} className={'text-center'}>
                {'Your cart'}
              </Typography>
              <div>
                <CheckoutProductList
                  lines={checkout.lines}
                  token={checkout.id}
                  displayPrices={displayPrices}
                />
                {displayPrices && <CartSummary checkout={checkout} />}
              </div>
              <p className={'mt-8 flex justify-center'}>
                <Link href={'/checkout'}>
                  <Button>{'Proceed to checkout'}</Button>
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;
