import * as m from '@paraglide/messages';
import type { AddressFragment, AddressType } from '@tempo/api/generated/graphql';
import type { AddressFormData } from '@tempo/next/types/addresses';
import { Button } from '@tempo/ui/components/buttons/Button';
import type { UseErrors } from '@tempo/ui/hooks/useErrors';
import { getById } from '@tempo/utils';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { Suspense, useState } from 'react';
import { UserAddressList } from './UserAddressList';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import { AddressListProvider } from '@tempo/checkout/components/sections/UserAddressSection/AddressListProvider';

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

  const [displayAddressCreate, setDisplayAddressCreate] = useState(false);

  const [editedAddressId, setEditedAddressId] = useState<string | null>();

  const displayAddressEdit = !!editedAddressId;

  const displayAddressList = !displayAddressEdit && !displayAddressCreate;

  const editedAddress = addresses.find(getById(editedAddressId as string)) as AddressFragment;

  return (
    <Suspense>
      <AddressListProvider
        checkoutAddress={
          type === 'SHIPPING' ? checkout?.shippingAddress : checkout?.billingAddress
        }
        onCheckoutAddressUpdate={onAddressSelect}
        defaultAddress={defaultAddress}
        checkAddressAvailability={type === 'SHIPPING'}
      >
        {/* {displayAddressCreate && (
          <AddressCreateForm title={title} onClose={() => setDisplayAddressCreate(false)} />
        )}

        {displayAddressEdit && (
          <AddressEditForm
            title={title}
            onClose={() => setEditedAddressId(null)}
            defaultValues={getAddressFormDataFromAddress(editedAddress)}
          />
        )} */}

        {displayAddressList && (
          <div className="flex flex-col">
            {/* <Title>{title}</Title> */}
            {addresses.length < 1 && (
              <Typography className="mb-3">
                {m.checkout_userAddressSection_noAddresses() ??
                  'You currently have no saved addresses.'}
              </Typography>
            )}
            <Button
              color="secondary"
              aria-label={m.checkout_userAddressSection_addAddress() ?? 'Add address'}
              onClick={() => setDisplayAddressCreate(true)}
              className="mb-4 w-full"
            >
              {m.checkout_userAddressSection_addAddress() ?? 'Add address'}
            </Button>
            <UserAddressList type={type} onEditChange={(id: string) => setEditedAddressId(id)} />
          </div>
        )}
      </AddressListProvider>
    </Suspense>
  );
};
