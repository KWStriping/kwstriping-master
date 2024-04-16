import type { AddressFragment } from '@core/api';
import { AddressDeleteDocument, SetAddressDefaultDocument } from '@core/api';
import { AddressType } from '@core/api/constants';
import { useTranslation } from '@core/i18n';
import { AddressDisplay } from '@core/ui/components/AddressDisplay';
import { Button } from '@core/ui/components/buttons/Button';
import { useMutation } from '@core/urql/hooks/useMutation';

export interface AddressBookCardProps {
  address: Maybe<AddressFragment>;
  onRefreshBook: () => void;
}

export function AddressBookCard({ address, onRefreshBook }: AddressBookCardProps) {
  const { t } = useTranslation();
  const [setAddressDefaultMutation] = useMutation(SetAddressDefaultDocument);
  const [deleteAddressMutation] = useMutation(AddressDeleteDocument);

  let cardHeader = '';
  if (address?.isDefaultShippingAddress && address?.isDefaultBillingAddress) {
    cardHeader = t('defaultBillingAndShipping', 'Default billing and shipping address');
  } else if (address?.isDefaultShippingAddress) {
    cardHeader = t('defaultShipping', 'Default shipping address');
  } else if (address?.isDefaultBillingAddress) {
    cardHeader = t('defaultBilling', 'Default billing address');
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
          {t('setDefaultBilling', 'Set as billing default')}
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
          {t('setDefaultShipping', 'Set as shipping default')}
        </Button>
      )}
      {!!address && (
        <Button className="my-1" onClick={() => onDeleteAddress(address.id)}>
          {t('ui.removeButton', 'Remove')}
        </Button>
      )}
    </div>
  );
}
