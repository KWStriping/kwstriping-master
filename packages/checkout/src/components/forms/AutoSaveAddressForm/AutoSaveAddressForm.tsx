import type { AddressFormProps } from '@core/checkout/components/forms/~AddressForm';
import { AddressForm } from '@core/checkout/components/forms/~AddressForm';
import { useAddressForm } from '@core/checkout/components/forms/~AddressForm/useAddressForm';
import type { UseAddressFormProps } from '@core/checkout/components/forms/~AddressForm/useAddressForm';
import type { AddressFormData } from '@core/types/addresses';
import { useFormDebouncedSubmit } from '@core/ui/hooks/useFormDebouncedSubmit';
import type { FC } from 'react';

type AutoSaveAddressFormProps = UseAddressFormProps &
  Omit<AddressFormProps, 'formProps' | 'defaultInputOptions' | 'children'>;

export const AutoSaveAddressForm: FC<AutoSaveAddressFormProps> = ({
  defaultValues,
  onSubmit,
  ...addressFormRest
}) => {
  const { formProps, onSubmit: handleSubmit } = useAddressForm({
    defaultValues,
    onSubmit,
  });
  const { getValues } = formProps;

  const debouncedSubmit = useFormDebouncedSubmit<AddressFormData>({
    defaultFormData: defaultValues,
    getValues,
    onSubmit: handleSubmit,
  });

  return (
    <AddressForm
      {...addressFormRest}
      defaultInputOptions={{ onChange: debouncedSubmit }}
      formProps={formProps}
    />
  );
};
