import type { AddressFragment, AddressType } from '@core/api';
import { useTranslation } from '@core/i18n';
import { SelectBoxGroup } from '@core/ui/components/inputs/SelectBoxGroup';
import type { FC } from 'react';
import { AddressSelectBox } from '@core/checkout/components/AddressSelectBox';
import { useAddressList } from '@core/checkout/components/sections/UserAddressSection/AddressListProvider';
import { useAddressAvailability } from '@core/checkout/hooks/useAddressAvailability';

interface UserAddressListProps {
  onEditChange: (id: string) => void;
  type: AddressType;
}

export const UserAddressList: FC<UserAddressListProps> = ({ onEditChange, type }) => {
  const { t } = useTranslation();
  const isShippingAddressList = type === 'SHIPPING';
  const { addressList, selectedAddressId, setSelectedAddressId } = useAddressList();
  const { isAvailable } = useAddressAvailability({
    pause: !isShippingAddressList,
  });
  return (
    <SelectBoxGroup
      label={
        isShippingAddressList
          ? t('shippingAddresses', 'Shipping addresses')
          : t('billingAddresses', 'Billing addresses')
      }
    >
      {addressList.map(({ id, ...rest }: AddressFragment) => (
        <AddressSelectBox
          value={id}
          key={`${type}-${id}`}
          id={`${type}-${id}`}
          selectedValue={selectedAddressId}
          onChange={() => setSelectedAddressId(id)}
          address={{ ...rest }}
          onEdit={() => onEditChange(id)}
          unavailable={!isAvailable(rest)}
        />
      ))}
    </SelectBoxGroup>
  );
};
