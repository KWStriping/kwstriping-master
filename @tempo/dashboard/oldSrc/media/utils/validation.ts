import type { MediaData } from '@dashboard/components/MediaItemDetailsPage/form';
import { MediaErrorCode } from '@tempo/api/generated/constants';
import type { MediaErrorFragment } from '@tempo/api/generated/graphql';

const createEmptyRequiredError = (field: string): MediaErrorFragment => ({
  __typename: 'MediaError',
  code: MediaErrorCode.Required,
  field,
  message: null,
});

export const validateMediaCreateData = (data: MediaData) => {
  let errors: MediaErrorFragment[] = [];

  for (const fieldName of ['type', 'alt', 'title']) {
    if (!data[fieldName]) {
      errors = [...errors, createEmptyRequiredError(fieldName)];
    }
  }

  return errors;
};
