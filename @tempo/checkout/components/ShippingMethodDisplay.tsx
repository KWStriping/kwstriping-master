import type { ShippingMethodFragment } from '@tempo/api/generated/graphql';

// import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';

export interface ShippingMethodDisplayProps {
  method: Maybe<ShippingMethodFragment>;
}

export function ShippingMethodDisplay({ method }: ShippingMethodDisplayProps) {
  const { formatPrice } = useLocalization();
  if (!method) return null;
  return (
    <div>
      <div className="mt-6 text-base font-medium text-gray-900">{method.name}</div>
      <div className="mt-1 flex items-center text-sm text-gray-500">
        {method.minimumDeliveryDays || 2}-{method.maximumDeliveryDays || 14} business days
      </div>
      <div className="mt-6 text-sm font-medium text-gray-900">{formatPrice(method.price)}</div>
    </div>
  );
}

export default ShippingMethodDisplay;
