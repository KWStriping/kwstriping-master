import type { AddressFormProps } from '@tempo/checkout/components/forms/~AddressForm';
import type { AddressFormData } from '@tempo/types/addresses';
import { useErrors } from '@tempo/ui/hooks/useErrors';
import type { FC } from 'react';
import { ManualSaveAddressForm } from '@tempo/checkout/components/forms/ManualSaveAddressForm';
import { useAddressList } from '@tempo/checkout/components/sections/UserAddressSection/AddressListProvider';

export interface AddressCreateFormProps extends Pick<AddressFormProps, 'title'> {
  onClose: () => void;
}

export const AddressCreateForm: FC<AddressCreateFormProps> = ({ onClose, ...rest }) => {
  const { addAddress, creating } = useAddressList();
  const { setApiErrors, ...errorsRest } = useErrors<AddressFormData>();

  const handleSubmit = async (formData: AddressFormData) => {
    const { hasErrors, errors } = await addAddress(formData);

    if (hasErrors) {
      setApiErrors(errors);
      return;
    }

    onClose();
  };

  return (
    <ManualSaveAddressForm
      onSubmit={handleSubmit}
      onCancel={onClose}
      loading={creating}
      {...errorsRest}
      {...rest}
    />
  );
};
