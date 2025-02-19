import * as m from '@paraglide/messages';
import type { AddressFragment, AddressType } from '@tempo/api/generated/graphql';
import { SelectBoxGroup } from '@tempo/ui/components/inputs/SelectBoxGroup';
import type { FC } from 'react';
import { AddressSelectBox } from '@tempo/checkout/components/AddressSelectBox';
import { useAddressList } from '@tempo/checkout/components/sections/UserAddressSection/AddressListProvider';
import { useAddressAvailability } from '@tempo/checkout/hooks/useAddressAvailability';

interface UserAddressListProps {
  onEditChange: (id: string) => void;
  type: AddressType;
}

export const UserAddressList: FC<UserAddressListProps> = ({ onEditChange, type }) => {
  const isShippingAddressList = type === 'SHIPPING';
  const { addressList, selectedAddressId, setSelectedAddressId } = useAddressList();
  const { isAvailable } = useAddressAvailability({
    pause: !isShippingAddressList,
  });
  return (
    <SelectBoxGroup
      label={
        isShippingAddressList
          ? m.shippingAddresses() ?? 'Shipping addresses'
          : m.billingAddresses() ?? 'Billing addresses'
      }
      value={selectedAddressId}
      onChange={(event) => setSelectedAddressId(event.target.value)}
    >
      {addressList.map(({ id, ...rest }: AddressFragment) => (
        <AddressSelectBox
          value={id}
          key={`${type}-${id}`}
          id={`${type}-${id}`}
          address={{ ...rest }}
          onEdit={() => onEditChange(id)}
          unavailable={!isAvailable(rest)}
        />
      ))}
    </SelectBoxGroup>
  );
};
