import type { FC } from 'react';
import type { CheckoutProps } from '@tempo/checkout/components/Checkout';
import CoreCheckout from '@tempo/checkout/components/Checkout';

const Checkout: FC<CheckoutProps> = (props: CheckoutProps) => {
  return <CoreCheckout {...props} />;
};

export default Checkout;
