import type { CheckoutProps } from '@tempo/checkout/components/Checkout';
import CoreCheckout from '@tempo/checkout/components/Checkout';
import type { FC } from 'react';

const Checkout: FC<CheckoutProps> = (props: CheckoutProps) => {
  return <CoreCheckout {...props} />;
};

export default Checkout;
