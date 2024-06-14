import type { ProductDetailsFragment, AttributeDetailsFragment } from '@tempo/api/generated/graphql';

/**
 * When a variant is selected, the variant attributes are shown together with
 * the attributes of the product. Otherwise, only the product
 * attributes are shown
 * @param   product  The product object
 * @param   selectedVariant   The selected variant object
 * @return  The attributes that will be shown to the user for the chosen product
 */

export const getProductAttributes = (
  product: ProductDetailsFragment,
  selectedVariant?: ProductDetailsFragment
): AttributeDetailsFragment[] => {
  if (selectedVariant) return product.attributes.concat(selectedVariant.attributes);
  return product.attributes;
};


