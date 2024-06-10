import type { CommonError } from '@tempo/dashboard/oldSrc/utils/errors/common';
import { CommonErrorCode } from '@tempo/dashboard/oldSrc/utils/errors/common';

import type { TaxClassesPageFormData } from '../types';

export const createEmptyRequiredError = (field: string): CommonError<CommonErrorCode> => ({
  code: CommonErrorCode.Required,
  field,
  message: null,
});

export const validateTaxClassFormData = (data: TaxClassesPageFormData) => {
  let errors: Array<CommonError<CommonErrorCode>> = [];

  if (!data?.name) {
    errors = [...errors, createEmptyRequiredError('name')];
  }

  return errors;
};
