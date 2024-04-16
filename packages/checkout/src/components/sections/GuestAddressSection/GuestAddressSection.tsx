import type { AddressFragment, AddressType } from '@core/api';
import type { AddressFormData } from '@core/types/addresses';
import type { UseErrors } from '@core/ui/hooks/useErrors';
import { getAddressFormDataFromAddress } from '@core/utils';
import type { FC } from 'react';
import { AutoSaveAddressForm } from '@core/checkout/components/forms/AutoSaveAddressForm';

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
