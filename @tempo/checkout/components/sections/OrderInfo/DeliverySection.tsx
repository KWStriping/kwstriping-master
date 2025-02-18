import * as m from '@paraglide/messages';
import type { OrderFragment, ShippingMethodFragment } from '@tempo/api/generated/graphql';
import Typography from '@mui/material/Typography';
import { Section } from './Section';

const isShipping = (
  fulfillmentMethod: OrderFragment['fulfillmentMethod']
): fulfillmentMethod is ShippingMethodFragment =>
  fulfillmentMethod?.__typename === 'ShippingMethod';

export const DeliverySection = ({
  fulfillmentMethod,
}: {
  fulfillmentMethod: OrderFragment['fulfillmentMethod'];
}) => {
  const getDeliveryEstimateText = () => {
    if (!fulfillmentMethod || !isShipping(fulfillmentMethod)) {
      return;
    }
    const { minimumDeliveryDays, maximumDeliveryDays } = fulfillmentMethod;

    if (!minimumDeliveryDays || !maximumDeliveryDays) {
      return undefined;
    }

    return (
      m.checkout_businessDays({
        min: minimumDeliveryDays.toString(),
        max: maximumDeliveryDays.toString(),
      }) ?? '{{min}}-{{max}} business days'
    );
  };

  return (
    <Section title={m.checkout_fulfillmentMethod() ?? 'Delivery method'}>
      {!isShipping(fulfillmentMethod) ? (
        <Typography color="secondary">
          {m.checkout_shippingMethodNotApplicable() ?? 'Not applicable'}
        </Typography>
      ) : (
        <>
          <Typography>{fulfillmentMethod.name}</Typography>
          <Typography>{getDeliveryEstimateText()}</Typography>
        </>
      )}
    </Section>
  );
};
