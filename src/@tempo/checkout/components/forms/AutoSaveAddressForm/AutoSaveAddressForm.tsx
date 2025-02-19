import type { AddressFormProps } from '@tempo/checkout/components/forms/~AddressForm';
import { AddressForm } from '@tempo/checkout/components/forms/~AddressForm';
import { useAddressForm } from '@tempo/checkout/components/forms/~AddressForm/useAddressForm';
import type { UseAddressFormProps } from '@tempo/checkout/components/forms/~AddressForm/useAddressForm';
import type { AddressFormData } from '@tempo/types/addresses';
import { useFormDebouncedSubmit } from '@tempo/ui/hooks/useFormDebouncedSubmit';
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
