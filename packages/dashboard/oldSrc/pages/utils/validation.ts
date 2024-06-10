import type { PageData } from '@dashboard/components/PageDetailsPage/form';
import type { PageErrorWithAttributesFragment } from '@core/api/graphql';
import { PageErrorCode } from '@core/api/constants';

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
