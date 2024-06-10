import type { ProductCreateData } from '@tempo/dashboard/components/products/ProductCreatePage';
import type { ProductCreateData } from '@tempo/dashboard/components/products/ProductCreatePage/form';
import type { ProductUpdateSubmitData } from '@tempo/dashboard/components/products/ProductPage/form';
import { ProductErrorCode } from '@tempo/api/generated/constants';
import type { ProductErrorWithAttributesFragment } from '@tempo/api/generated/graphql';

export const validatePrice = (price: string) => price === '' || parseInt(price, 10) < 0;

export const validateCostPrice = (price: string) => price !== '' && parseInt(price, 10) < 0;

const createEmptyRequiredError = (field: string): ProductErrorWithAttributesFragment => ({
  __typename: 'ProductError',
  code: ProductErrorCode.Required,
  field,
  message: null,
  attributes: [],
});

export const validateProductCreateData = (data: ProductCreateData) => {
  let errors: ProductErrorWithAttributesFragment[] = [];

  if (!data?.productKlass) {
    errors = [...errors, createEmptyRequiredError('productKlass')];
  }

  if (!data?.name) {
    errors = [...errors, createEmptyRequiredError('name')];
  }

  return errors;
};

export const validateVariantData = (
  data: ProductCreateData | ProductUpdateSubmitData
): ProductErrorWithAttributesFragment[] => (!data?.name ? [createEmptyRequiredError('name')] : []);
