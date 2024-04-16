import { useTranslation } from '@core/i18n';
import SingleSelectField from '@dashboard/components/fields/SingleSelectField';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import useAppChannel from '@dashboard/components/layout/Layout/AppChannelContext';
import Label from '@dashboard/components/orders/OrderHistory/Label';
import type { FormChange } from '@dashboard/hooks/useForm';
import GiftCardCustomerSelectField from '@dashboard/oldSrc/giftCards/GiftCardCreateDialog/GiftCardCustomerSelectField';
import type { GiftCardCreateFormCustomer } from '@dashboard/oldSrc/giftCards/GiftCardCreateDialog/types';
import { mapSlugNodeToChoice } from '@dashboard/oldSrc/utils/maps';
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

  const { t } = useTranslation();

  return (
    <>
      <ControlledCheckbox
        name={'sendToCustomerSelected'}
        label={t('dashboard.endToCustomerSelectedLabel', 'Send gift card to customer')}
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
            text={t(
              'dashboard.customerSubtitle',
              'Selected customer will be sent the generated gift card code. Someone else can redeem the gift card code. Gift card will be assigned to account which redeemed the code.'
            )}
          />
          <SingleSelectField
            choices={channelsChoices}
            name="channelSlug"
            label={t('dashboard.channelSelectLabel', 'Channel')}
            value={selectedChannelSlug || channel?.slug}
            onChange={change}
          />
          <Label
            text={t(
              'dashboard.customerChannelSubtitle',
              'Customer will be sent the gift card code via this channels email address'
            )}
          />
        </>
      )}
    </>
  );
};

export default GiftCardSendToCustomer;
