import * as m from '@paraglide/messages';
import type { OrderFragment } from '@tempo/api/generated/graphql';
import { shippingMessages } from '@tempo/checkout/components/sections/ShippingAddressSection/messages';
import { Address } from '@tempo/ui/components/Address';
import Typography from '@mui/material/Typography';

import { DeliverySection } from './DeliverySection';
import { PaymentSection } from './PaymentSection';
import { Section } from './Section';
import { billingMessages } from '@tempo/checkout/components/sections/~BillingAddressSection/messages';

export const OrderInfo = ({ order }: { order: OrderFragment }) => {
  const { id, fulfillmentMethod, shippingAddress, billingAddress, userEmail } = order;

  return (
    <section className="lg:w-1/2 border border-primary/[0.15] rounded-lg pt-5 px-4">
      <PaymentSection orderId={id} />
      <DeliverySection fulfillmentMethod={fulfillmentMethod} />
      <Section title={m.checkout_contactInfo() ?? 'Contact info'}>
        <Typography>{userEmail}</Typography>
      </Section>
      {shippingAddress && (
        <Section
          title={
            m[shippingMessages.shippingAddress.id] ??
            shippingMessages.shippingAddress.defaultMessage
          }
        >
          <Address address={shippingAddress} />
        </Section>
      )}
      {billingAddress && (
        <Section
          title={
            m[billingMessages.billingAddress.id] ?? billingMessages.billingAddress.defaultMessage
          }
        >
          <Address address={billingAddress} />
        </Section>
      )}
    </section>
  );
};
