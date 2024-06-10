import type { AddressFragment, AddressType } from '@tempo/api/generated/graphql';
import type { AddressFormData } from '@tempo/types/addresses';
import type { UseErrors } from '@tempo/ui/hooks/useErrors';
import { getAddressFormDataFromAddress } from '@tempo/utils';
import type { FC } from 'react';
import { AutoSaveAddressForm } from '@tempo/checkout/components/forms/AutoSaveAddressForm';

type MaybeAddress = AddressFragment | null | undefined;

interface GuestAddressSectionProps extends UseErrors<AddressFormData> {
  onSubmit: (address: AddressFormData) => void;
  title: string;
  defaultAddress: MaybeAddress;
  checkAddressAvailability: boolean;
  type: AddressType;
}

export const GuestAddressSection: FC<GuestAddressSectionProps> = ({
  onSubmit,
  defaultAddress,
  ...rest
}) => {
  const addressFormData = getAddressFormDataFromAddress(defaultAddress);

  const handleSave = (address: AddressFormData) => onSubmit({ ...address, autoSave: true });

  return <AutoSaveAddressForm onSubmit={handleSave} defaultValues={addressFormData} {...rest} />;
};
