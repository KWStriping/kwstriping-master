import type { AddressFragment, AddressType } from '@core/api';
import { AddressSectionSkeleton } from '@core/checkout/components/sections/ShippingAddressSection/AddressSectionSkeleton';
import { useTranslation } from '@core/i18n';
import type { AddressFormData } from '@core/types/addresses';
import { Button } from '@core/ui/components/buttons/Button';
import type { UseErrors } from '@core/ui/hooks/useErrors';
import { getById, getAddressFormDataFromAddress } from '@core/utils';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { Suspense, useState } from 'react';
import { AddressListProvider } from '@core/checkout/components/sections/UserAddressSection/AddressListProvider';
import { useCheckout } from '@core/checkout/providers/CheckoutProvider';
import { AddressCreateForm } from './AddressCreateForm';
import { AddressEditForm } from './AddressEditForm';
import { UserAddressList } from './UserAddressList';

export interface UserAddressSectionProps extends UseErrors<AddressFormData> {
  defaultAddress: AddressFragment | null | undefined;
  onAddressSelect: (address: AddressFormData) => void;
  addresses: AddressFragment[];
  title: string;
  type: AddressType;
}

export const UserAddressSection: FC<UserAddressSectionProps> = ({
  defaultAddress,
  addresses = [],
  onAddressSelect,
  title,
  type,
}) => {
  const { checkout } = useCheckout();
  const { t } = useTranslation();

  const [displayAddressCreate, setDisplayAddressCreate] = useState(false);

  const [editedAddressId, setEditedAddressId] = useState<string | null>();

  const displayAddressEdit = !!editedAddressId;

  const displayAddressList = !displayAddressEdit && !displayAddressCreate;

  const editedAddress = addresses.find(getById(editedAddressId as string)) as AddressFragment;

  return (
    <Suspense fallback={<AddressSectionSkeleton />}>
      <AddressListProvider
        checkoutAddress={
          type === 'SHIPPING' ? checkout?.shippingAddress : checkout?.billingAddress
        }
        onCheckoutAddressUpdate={onAddressSelect}
        defaultAddress={defaultAddress}
        checkAddressAvailability={type === 'SHIPPING'}
      >
        {displayAddressCreate && (
          <AddressCreateForm title={title} onClose={() => setDisplayAddressCreate(false)} />
        )}

        {displayAddressEdit && (
          <AddressEditForm
            title={title}
            onClose={() => setEditedAddressId(null)}
            defaultValues={getAddressFormDataFromAddress(editedAddress)}
          />
        )}

        {displayAddressList && (
          <div className="flex flex-col">
            {/* <Title>{title}</Title> */}
            {addresses.length < 1 && (
              <Typography className="mb-3">
                {t(
                  'checkout.userAddressSection.noAddresses',
                  'You currently have no saved addresses.'
                )}
              </Typography>
            )}
            <Button
              color="secondary"
              aria-label={t('checkout.userAddressSection.addAddress', 'Add address')}
              onClick={() => setDisplayAddressCreate(true)}
              className="mb-4 w-full"
            >
              {t('checkout.userAddressSection.addAddress', 'Add address')}
            </Button>
            <UserAddressList type={type} onEditChange={(id: string) => setEditedAddressId(id)} />
          </div>
        )}
      </AddressListProvider>
    </Suspense>
  );
};
