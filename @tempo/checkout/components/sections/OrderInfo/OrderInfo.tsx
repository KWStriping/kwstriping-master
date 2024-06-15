import type { OrderFragment } from '@tempo/api/generated/graphql';
import { Address } from '@tempo/ui/components/Address';
import Typography from '@mui/material/Typography';

import { DeliverySection } from './DeliverySection';
import { PaymentSection } from './PaymentSection';
import { Section } from './Section';

export const OrderInfo = ({ order }: { order: OrderFragment }) => {
  const { id, fulfillmentMethod, shippingAddress, billingAddress, userEmail } = order;

  return (
    <section className="lg:w-1/2 border border-primary/[0.15] rounded-lg pt-5 px-4">
      <PaymentSection orderId={id} />
      <DeliverySection fulfillmentMethod={fulfillmentMethod} />
      <Section title={'Contact info'}>
        <Typography>{userEmail}</Typography>
      </Section>
      {shippingAddress && (
        <Section title={'Shipping address'}>
          <Address address={shippingAddress} />
        </Section>
      )}
      {billingAddress && (
        <Section title={'Billing address'}>
          <Address address={billingAddress} />
        </Section>
      )}
    </section>
  );
};
