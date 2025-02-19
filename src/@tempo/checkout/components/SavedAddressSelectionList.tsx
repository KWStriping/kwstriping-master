import type { AddressFragment, ErrorInterface } from '@tempo/api/generated/graphql';
import { CurrentUserAddressesDocument } from '@tempo/api/generated/graphql';
import { CountryCode } from '@tempo/api/generated/constants';
import type { AddressFormData } from '@tempo/next/types/addresses';
import { useQuery } from '@tempo/api/hooks/useQuery';
import clsx from 'clsx';
import { useState } from 'react';

interface SavedAddressSelectionListProps {
  updateAddress: (address: AddressFormData) => Promise<ErrorInterface[]>;
  disabled?: boolean;
}

export function SavedAddressSelectionList({ updateAddress }: SavedAddressSelectionListProps) {
  const { error, data } = useQuery(CurrentUserAddressesDocument, { variables: {} });
  const [selectedSavedAddress, setSelectedSavedAddress] = useState<AddressFragment | null>();

  if (error) {
    return <p>Error :{error.message}</p>;
  }

  const addresses = data?.me?.addresses || [];

  if (addresses.length === 0) return null;

  const onSelectSavedAddress = async (address: AddressFragment) => {
    setSelectedSavedAddress(address);

    // @todo handle errors
    const _errors = await updateAddress({
      firstName: address?.firstName,
      lastName: address?.lastName,
      phone: address?.phone || '',
      countryCode: CountryCode.Us,
      streetAddress1: address.streetAddress1,
      city: address.city,
      postalCode: address.postalCode,
    });
  };

  return (
    <div className="grid grid-cols-2 mb-2">
      {addresses.map((address) => (
        <div
          role="radio"
          aria-checked={address?.id === selectedSavedAddress?.id}
          tabIndex={-1}
          onClick={() => address && onSelectSavedAddress(address)}
          onKeyDown={(e) => {
            if (address && e.key === 'Enter') {
              return onSelectSavedAddress(address);
            }
            return null;
          }}
          className={clsx(
            'border-2 p-3 mr-2 rounded-md',
            address?.id === selectedSavedAddress?.id && 'border-blue-500'
          )}
          key={address?.id}
        >
          <p>{`${address?.firstName} ${address?.lastName}`}</p>
          <p className="text-gray-600 text-sm">{address?.streetAddress1}</p>
          <p className="text-gray-600 text-sm">
            {`${address?.postalCode} ${address?.city}, ${address?.country.name}`}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SavedAddressSelectionList;
