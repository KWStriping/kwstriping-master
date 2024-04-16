import type { ProductCreateData } from '@dashboard/components/products/ProductCreatePage';
import type { ProductCreateData } from '@dashboard/components/products/ProductCreatePage/form';
import type { ProductUpdateSubmitData } from '@dashboard/components/products/ProductPage/form';
import { ProductErrorCode } from '@core/api/constants';
import type { ProductErrorWithAttributesFragment } from '@core/api/graphql';

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
