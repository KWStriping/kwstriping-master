import { getById, getByUnmatchingId } from '@tempo/utils';
import type { SearchProductsQuery } from '@tempo/api/generated/graphql';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';

export type SearchVariant = RelayToFlat<
  NonNullable<SearchProductsQuery['search']>
>[0]['variants'][0];

type SetVariantsAction = (data: SearchVariant[]) => void;

export function isVariantSelected(
  variant: SearchVariant,
  selectedVariantsToProductsMap: SearchVariant[]
): boolean {
  return !!selectedVariantsToProductsMap.find(getById(variant.id));
}

export const handleProductAssign = (
  product: RelayToFlat<NonNullable<SearchProductsQuery['search']>>[0],
  productIndex: number,
  productsWithAllVariantsSelected: boolean[],
  variants: SearchVariant[],
  setVariants: SetVariantsAction
) =>
  productsWithAllVariantsSelected[productIndex]
    ? setVariants(
        variants.filter((selectedVariant) => !product.variants.find(getById(selectedVariant.id)))
      )
    : setVariants([
        ...variants,
        ...product.variants.filter(
          (productVariant) => !variants.find(getById(productVariant.id))
        ),
      ]);

export const handleVariantAssign = (
  variant: SearchVariant,
  variantIndex: number,
  productIndex: number,
  variants: SearchVariant[],
  selectedVariantsToProductsMap: boolean[][],
  setVariants: SetVariantsAction
) =>
  selectedVariantsToProductsMap[productIndex][variantIndex]
    ? setVariants(variants.filter(getByUnmatchingId(variant.id)))
    : setVariants([...variants, variant]);

export function hasAllVariantsSelected(
  productVariants: SearchVariant[],
  selectedVariantsToProductsMap: SearchVariant[]
): boolean {
  return productVariants.reduce(
    (acc, productVariant) =>
      acc && !!selectedVariantsToProductsMap.find(getById(productVariant.id)),
    true
  );
}
