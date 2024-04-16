import type { FulfillmentMethodFragment } from '@core/api';

import { useLocalization } from '@core/ui/providers/LocalizationProvider';
import { translate } from '@core/ui/utils/translations';

export interface ShippingMethodDisplayProps {
  method: Maybe<FulfillmentMethodFragment>;
}

export function ShippingMethodDisplay({ method }: ShippingMethodDisplayProps) {
  const { formatPrice } = useLocalization();
  return (
    <div>
      <div className="mt-6 text-base font-medium text-gray-900">{translate(method, 'name')}</div>
      <div className="mt-1 flex items-center text-sm text-gray-500">
        {method.minimumDeliveryDays || 2}-{method.maximumDeliveryDays || 14} business days
      </div>
      <div className="mt-6 text-sm font-medium text-gray-900">{formatPrice(method.price)}</div>
    </div>
  );
}

export default ShippingMethodDisplay;
