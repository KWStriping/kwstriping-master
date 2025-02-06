import type {
  AbstractProductDetailsFragment,
  ProductDetailsFragment,
} from '@tempo/api/generated/graphql';
import { RadioGroup, Radio, Label } from '@headlessui/react';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { useShopSettings } from '@tempo/ui/providers';

export interface VariantSelectorProps {
  variants: AbstractProductDetailsFragment['variants'];
  selectedVariant: Maybe<ProductDetailsFragment>;
  onChange: (productSlug: string) => void;
}

export function VariantSelector({
  variants: _variants,
  selectedVariant,
  onChange,
}: VariantSelectorProps) {
  console.log('selectedVariant?.slug', selectedVariant?.slug);
  const { displayPrices } = useShopSettings();
  const { formatPrice } = useLocalization();
  if (!_variants) return null; // TODO

  // TODO: why is variants on object?
  const variants: AbstractProductDetailsFragment['variants'] = Array.isArray(_variants)
    ? _variants
    : Object.values(_variants);

  // console.log('>>> Variants:', variants);
  // console.log('>>> variants?.length:', variants?.length);
  // console.log('>>> variants type', typeof variants);
  // console.log('>>> variants is array', Array.isArray(variants));

  // Skip displaying selector if there are less than 2 variants.
  if (!variants?.length || variants.length === 1) return null;

  const shouldDisplayPrice = displayPrices;

  return (
    <div className="w-full">
      <RadioGroup value={selectedVariant?.slug ?? null} onChange={onChange}>
        <div className="space-y-4">
          {variants.map((variant) => (
            <Radio
              key={variant.slug}
              value={variant.slug}
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
                  {/* as="div" className="w-full justify-between p-4" */}
                  <Label>
                    <div className="flex flex-row gap-2 w-full">
                      <Typography
                        className={'grow font-semibold text-md'}
                        data-testid={`variantOf${variant.name}`}
                      >
                        {/* TODO translate */}
                        {variant.name}
                      </Typography>
                      <div>
                        {shouldDisplayPrice && formatPrice(variant.pricing?.price?.gross)}
                      </div>
                    </div>
                  </Label>
                </div>
              )}
            </Radio>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

export default VariantSelector;
