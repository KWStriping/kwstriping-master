import type { OrderFragment, ShippingMethodFragment } from '@core/api';
import { useTranslation } from '@core/i18n';
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
  const { t } = useTranslation();

  const getDeliveryEstimateText = () => {
    if (!fulfillmentMethod || !isShipping(fulfillmentMethod)) {
      return;
    }
    const { minimumDeliveryDays, maximumDeliveryDays } = fulfillmentMethod;

    if (!minimumDeliveryDays || !maximumDeliveryDays) {
      return undefined;
    }

    return t('checkout.businessDays', '{{min}}-{{max}} business days', {
      min: minimumDeliveryDays.toString(),
      max: maximumDeliveryDays.toString(),
    });
  };

  return (
    <Section title={t('checkout.fulfillmentMethod', 'Delivery method')}>
      {!isShipping(fulfillmentMethod) ? (
        <Typography color="secondary">
          {t('checkout.shippingMethodNotApplicable', 'Not applicable')}
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
