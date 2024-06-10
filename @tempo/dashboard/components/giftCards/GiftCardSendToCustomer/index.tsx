import * as m from '@paraglide/messages';
import SingleSelectField from '@tempo/dashboard/components/fields/SingleSelectField';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import useAppChannel from '@tempo/dashboard/components/layout/Layout/AppChannelContext';
import Label from '@tempo/dashboard/components/orders/OrderHistory/Label';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import GiftCardCustomerSelectField from '@tempo/dashboard/oldSrc/giftCards/GiftCardCreateDialog/GiftCardCustomerSelectField';
import type { GiftCardCreateFormCustomer } from '@tempo/dashboard/oldSrc/giftCards/GiftCardCreateDialog/types';
import { mapSlugNodeToChoice } from '@tempo/dashboard/oldSrc/utils/maps';
import { useEffect } from 'react';
import type { FC } from 'react';

interface GiftCardSendToCustomerProps {
  selectedChannelSlug: string;
  change: FormChange;
  sendToCustomerSelected: boolean;
  selectedCustomer: GiftCardCreateFormCustomer;
  setSelectedCustomer: (customer: GiftCardCreateFormCustomer) => void;
  disabled?: boolean;
}

const GiftCardSendToCustomer: FC<GiftCardSendToCustomerProps> = ({
  change,
  sendToCustomerSelected,
  selectedChannelSlug,
  selectedCustomer,
  setSelectedCustomer,
  disabled = false,
}) => {
  const { channel, availableChannels } = useAppChannel(false);

  const channelsChoices = mapSlugNodeToChoice(availableChannels);

  useEffect(() => change({ target: { name: 'channelSlug', value: channel?.slug } }), []);

  return (
    <>
      <ControlledCheckbox
        name={'sendToCustomerSelected'}
        label={m.dashboard_endToCustomerSelectedLabel() ?? 'Send gift card to customer'}
        checked={sendToCustomerSelected}
        onChange={change}
        disabled={disabled}
      />
      {sendToCustomerSelected && (
        <>
          <GiftCardCustomerSelectField
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            disabled={disabled}
          />
          <Label
            text={
              m.dashboard_customerSubtitle() ??
              'Selected customer will be sent the generated gift card code. Someone else can redeem the gift card code. Gift card will be assigned to account which redeemed the code.'
            }
          />
          <SingleSelectField
            choices={channelsChoices}
            name="channelSlug"
            label={m.dashboard_channelSelectLabel() ?? 'Channel'}
            value={selectedChannelSlug || channel?.slug}
            onChange={change}
          />
          <Label
            text={
              m.dashboard_customerChannelSubtitle() ??
              'Customer will be sent the gift card code via this channels email address'
            }
          />
        </>
      )}
    </>
  );
};

export default GiftCardSendToCustomer;
