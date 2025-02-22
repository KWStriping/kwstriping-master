import type { ShippingMethodFragment } from '@tempo/api/generated/graphql';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { Radio, Label, Description } from '@headlessui/react';
import clsx from 'clsx';

export interface ShippingMethodOptionProps {
  method: Maybe<ShippingMethodFragment>;
}

export function ShippingMethodOption({ method }: ShippingMethodOptionProps) {
  const { formatPrice } = useLocalization();
  if (!method) return null;
  return (
    <Radio
      key={method.id}
      value={method}
      className={({ checked, active }) =>
        clsx(
          checked ? 'border-transparent' : 'border-gray-300',
          active ? 'ring-1 ring-blue-500' : '',
          'bg-white border rounded shadow-sm p-4 flex cursor-pointer'
        )
      }
    >
      {({ checked, active }) => (
        <>
          <div className="flex-1 flex">
            <div className="flex flex-col">
              {/* as="span" className="block text-base font-medium text-gray-900" */}
              <Label>{method.name}</Label>
              {/* as="span" className="mt-1 flex items-center text-sm text-gray-500" */}
              <Description>
                {method.minimumDeliveryDays || 2}-{method.maximumDeliveryDays || 14} business days
              </Description>
              {/* as="span" className="mt-6 text-sm font-medium text-gray-900" */}
              <Description>{formatPrice(method?.price)}</Description>
            </div>
          </div>
          <div
            className={clsx(
              active ? 'border' : 'border-2',
              checked ? 'border-blue-500' : 'border-transparent',
              'absolute -inset-px rounded pointer-events-none'
            )}
            aria-hidden="true"
          />
        </>
      )}
    </Radio>
  );
}
