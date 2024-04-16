import type { OrderFragment } from '@core/api';
import { shippingMessages } from '@core/checkout/components/sections/ShippingAddressSection/messages';
import { useTranslation } from '@core/i18n';
import { Address } from '@core/ui/components/Address';
import Typography from '@mui/material/Typography';
import { billingMessages } from '@core/checkout/components/sections/~BillingAddressSection/messages';

import { DeliverySection } from './DeliverySection';
import { PaymentSection } from './PaymentSection';
import { Section } from './Section';

export const OrderInfo = ({ order }: { order: OrderFragment }) => {
  const { t } = useTranslation();

  const { id, fulfillmentMethod, shippingAddress, billingAddress, userEmail } = order;

  return (
    <section className="lg:w-1/2 border border-primary/[0.15] rounded-lg pt-5 px-4">
      <PaymentSection orderId={id} />
      <DeliverySection fulfillmentMethod={fulfillmentMethod} />
      <Section title={t('checkout.contactInfo', 'Contact info')}>
        <Typography>{userEmail}</Typography>
      </Section>
      {shippingAddress && (
        <Section
          title={t(
            shippingMessages.shippingAddress.id,
            shippingMessages.shippingAddress.defaultMessage
          )}
        >
          <Address address={shippingAddress} />
        </Section>
      )}
      {billingAddress && (
        <Section
          title={t(
            billingMessages.billingAddress.id,
            billingMessages.billingAddress.defaultMessage
          )}
        >
          <Address address={billingAddress} />
        </Section>
      )}
    </section>
  );
};
