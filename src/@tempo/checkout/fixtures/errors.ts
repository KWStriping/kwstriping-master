import type { ValidationError } from '@tempo/next/types/errors';
import type { ApiErrors } from '@tempo/ui/hooks/useErrors';
import type { AddressFormData } from '@tempo/checkout/components/forms/AddressForm';

export const apiErrors: ApiErrors<AddressFormData> = [
  {
    message: 'This value is required for the address',
    field: 'streetAddress1',
    code: 'REQUIRED',
  },
  {
    message: 'This value is not valid for the address.',
    field: 'postalCode',
    code: 'INVALID',
  },
];

export const urqlError = {
  message:
    'You need one of the following permissions: AUTHENTICATED_STAFF_USER, AUTHENTICATED_APP]',
  name: 'authError',
  graphQLErrors: [],
  __typename: 'CheckoutError',
};

export const validationErrors: ValidationError<AddressFormData>[] = [
  {
    type: 'invalid',
    path: 'firstName',
    message: 'This is highly irregular',
  },
  {
    type: 'required',
    path: 'streetAddress1',
    message: 'This is missing',
  },
  {
    type: 'unique',
    path: 'city',
    message: 'This is not unique',
  },
];
