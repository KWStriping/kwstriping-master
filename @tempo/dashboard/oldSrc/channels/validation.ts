import type { FormData } from '@dashboard/components/ChannelForm';
import type { ChannelErrorFragment } from '@tempo/api/generated/graphql';
import { ChannelErrorCode } from '@tempo/api/generated/constants';

const createEmptyRequiredError = (field: string): ChannelErrorFragment => ({
  __typename: 'ChannelError',
  code: ChannelErrorCode.Required,
  field,
  message: null,
});

export const validateChannelFormData = (data: FormData) => {
  let errors: ChannelErrorFragment[] = [];

  if (!data?.name) {
    errors = [...errors, createEmptyRequiredError('name')];
  }

  if (!data?.slug) {
    errors = [...errors, createEmptyRequiredError('slug')];
  }

  if (!data?.currencyCode) {
    errors = [...errors, createEmptyRequiredError('currencyCode')];
  }

  if (!data?.defaultCountry) {
    errors = [...errors, createEmptyRequiredError('defaultCountry')];
  }

  return errors;
};
