import type { PageData } from '@tempo/dashboard/components/PageDetailsPage/form';
import type { PageErrorWithAttributesFragment } from '@tempo/api/generated/graphql';
import { PageErrorCode } from '@tempo/api/generated/constants';

const createEmptyRequiredError = (field: string): PageErrorWithAttributesFragment => ({
  __typename: 'PageError',
  code: PageErrorCode.Required,
  field,
  message: null,
  attributes: [],
});

export const validatePageCreateData = (data: PageData) => {
  let errors: PageErrorWithAttributesFragment[] = [];

  if (!data?.pageKlass) {
    errors = [...errors, createEmptyRequiredError('pageKlasses')];
  }

  if (!data?.title) {
    errors = [...errors, createEmptyRequiredError('title')];
  }

  return errors;
};
