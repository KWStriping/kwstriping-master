import type { AddressFormProps } from '@tempo/checkout/components/forms/~AddressForm';
import type { AddressFormData } from '@tempo/next/types/addresses';
import { useErrors } from '@tempo/ui/hooks/useErrors';
import type { FC } from 'react';
import { ManualSaveAddressForm } from '@tempo/checkout/components/forms/ManualSaveAddressForm';
import { useAddressList } from '@tempo/checkout/components/sections/UserAddressSection/AddressListProvider';

interface AddressEditFormProps extends Pick<AddressFormProps, 'title'> {
  defaultValues: AddressFormData;
  onClose: () => void;
}

export const AddressEditForm: FC<AddressEditFormProps> = ({
  onClose,
  defaultValues,
  ...rest
}) => {
  const { setApiErrors, ...errorsRest } = useErrors<AddressFormData>();
  const { updateAddress, deleteAddress, updating, deleting } = useAddressList();

  const handleUpdate = async (formData: AddressFormData) => {
    const { hasErrors, errors } = await updateAddress({
      ...formData,
      id: defaultValues.id,
    });

    if (!hasErrors) {
      setApiErrors(errors);
      onClose();
    }
  };

  const handleDelete = async () => {
    const { hasErrors, errors } = await deleteAddress(defaultValues.id);

    if (!hasErrors) {
      setApiErrors(errors);
      onClose();
    }
  };

  return (
    <ManualSaveAddressForm
      loading={updating || deleting}
      onSubmit={handleUpdate}
      onDelete={handleDelete}
      defaultValues={defaultValues}
      onCancel={onClose}
      {...errorsRest}
      {...rest}
    />
  );
};
