import type { ProductDetailsFragment } from '@core/api';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { useLocalization } from '@core/ui/providers/LocalizationProvider';
import { translate } from '@core/ui/utils/translations';
import Typography from '@mui/material/Typography';
import { useShopSettings } from '@core/ui/providers';

export interface VariantSelectorProps {
  product: Maybe<ProductDetailsFragment>;
  selectedVariantID: string | null;
  onChange: (productId: string) => void;
}

export function VariantSelector({ product, selectedVariantID, onChange }: VariantSelectorProps) {
  const { displayPrices } = useShopSettings()
  const { formatPrice } = useLocalization();
  if (!product) return null;
  const { variants } = product;

  // Skip displaying selector if there are less than 2 variants.
  if (!variants || variants.length === 1) return null;

  const shouldDisplayPrice = displayPrices;

  return (
    <div className="w-full">
      <RadioGroup value={selectedVariantID} onChange={onChange}>
        <div className="space-y-4">
          {variants.map((variant) => (
            <RadioGroup.Option
              key={variant.id}
              value={variant.id}
              className={({ checked }) =>
                clsx('bg-main w-full', checked && 'bg-brand', !checked && '')
              }
            >
              {({ checked }) => (
                <div
                  className={clsx(
                    'bg-white w-full h-full relative cursor-pointer object-contain border-2',
                    checked && 'border-brand border-solid',
                    !checked && 'hover:border-main border-main-2'
                  )}
                >
                  <RadioGroup.Label as="div" className="w-full justify-between p-4">
                    <div className="flex flex-row gap-2 w-full">
                      <Typography className={"grow font-semibold text-md"} data-testid={`variantOf${variant.name}`}>
                        {translate(variant, 'name')}
                      </Typography>
                      <div>
                        {shouldDisplayPrice && formatPrice(variant.pricing?.price?.gross)}
                      </div>
                    </div>
                  </RadioGroup.Label>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

export default VariantSelector;
