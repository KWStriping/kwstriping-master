import { AccountErrorCode } from '@core/api/constants';
import type {
  AccountErrorFragment,
  AddressUpdateInput,
  AddressType,
} from '@core/api/graphql';
import type { AddressTypeInput } from '@dashboard/oldSrc/customers/types';
import { transformFormToAddressInput } from '@dashboard/oldSrc/misc';
import { add, remove } from '@dashboard/oldSrc/utils/lists';
import { useState } from 'react';

interface UseAddressValidation<TInput, TOutput> {
  errors: AccountErrorFragment[];
  submit: (data: TInput & AddressTypeInput) => TOutput | Promise<AccountErrorFragment[]>;
}

function useAddressValidation<TInput, TOutput>(
  onSubmit: (address: TInput & AddressUpdateInput) => TOutput,
  addressType?: AddressType
): UseAddressValidation<TInput, TOutput> {
  const [validationErrors, setValidationErrors] = useState<AccountErrorFragment[]>([]);

  const countryRequiredError: AccountErrorFragment = {
    __typename: 'AccountError',
    code: AccountErrorCode.Required,
    field: 'country',
    addressType,
    message: 'Country required',
  };

  return {
    errors: validationErrors,
    submit: (data: TInput & AddressTypeInput) => {
      try {
        setValidationErrors(
          remove(countryRequiredError, validationErrors, (a, b) => a.field === b.field)
        );
        return onSubmit(transformFormToAddressInput(data));
      } catch {
        const errors = add(countryRequiredError, validationErrors);
        setValidationErrors(errors);
        // since every onSubmit must return Promise<error>
        return Promise.resolve(errors);
      }
    },
  };
}

export default useAddressValidation;
