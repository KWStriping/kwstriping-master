import type {
  SetAddressDefaultMutation,
  SetAddressDefaultMutationVariables,
  AddressDeleteMutation,
  AddressDeleteMutationVariables,
  AddressFragment,
} from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import { AddressDeleteDocument, SetAddressDefaultDocument } from '@tempo/api/generated/graphql';
import { AddressType } from '@tempo/api/generated/constants';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { AddressDisplay } from '@tempo/ui/components/AddressDisplay';
import { Button } from '@tempo/ui/components/buttons/Button';

export interface AddressBookCardProps {
  address: Maybe<AddressFragment>;
  onRefreshBook: () => void;
}

export function AddressBookCard({ address, onRefreshBook }: AddressBookCardProps) {
  const [setAddressDefaultMutation] = useMutation<
    SetAddressDefaultMutation,
    SetAddressDefaultMutationVariables
  >(SetAddressDefaultDocument);
  const [deleteAddressMutation] = useMutation<
    AddressDeleteMutation,
    AddressDeleteMutationVariables
  >(AddressDeleteDocument);

  let cardHeader = '';
  if (address?.isDefaultShippingAddress && address?.isDefaultBillingAddress) {
    cardHeader = m.defaultBillingAndShipping() ?? 'Default billing and shipping address';
  } else if (address?.isDefaultShippingAddress) {
    cardHeader = m.defaultShipping() ?? 'Default shipping address';
  } else if (address?.isDefaultBillingAddress) {
    cardHeader = m.defaultBilling() ?? 'Default billing address';
  }

  const onDeleteAddress = async (addressId: string) => {
    await deleteAddressMutation({ id: addressId });
    onRefreshBook();
  };

  return (
    <div className="justify-between flex flex-col checkout-section-container md:mx-2 mb-2">
      {!!cardHeader && <p className="text-md font-semibold mb-1">{cardHeader}</p>}
      <AddressDisplay address={address} />
      {!!address && !address?.isDefaultBillingAddress && (
        <Button
          className="my-1"
          onClick={() =>
            setAddressDefaultMutation({ id: address?.id, type: AddressType.Billing })
          }
        >
          {m.setDefaultBilling() ?? 'Set as billing default'}
        </Button>
      )}
      {!!address && !address?.isDefaultShippingAddress && (
        <Button
          className="my-1"
          onClick={() =>
            setAddressDefaultMutation({
              id: address?.id,
              type: AddressType.Shipping,
            })
          }
        >
          {m.setDefaultShipping() ?? 'Set as shipping default'}
        </Button>
      )}
      {!!address && (
        <Button className="my-1" onClick={() => onDeleteAddress(address.id)}>
          {m.ui_removeButton() ?? 'Remove'}
        </Button>
      )}
    </div>
  );
}
