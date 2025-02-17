import * as m from '@paraglide/messages';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { ChangeEvent, FC } from 'react';

import type { GiftCardSettingsFormData } from '../types';
import { giftCardExpirySettingsCard as messages } from './messages';
import type { GiftCardSettingsExpirySelectProps } from '@tempo/dashboard/components/giftCards/GiftCardSettingsExpirySelect';
import GiftCardSettingsExpirySelect from '@tempo/dashboard/components/giftCards/GiftCardSettingsExpirySelect';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

export interface GiftCardExpirySettingsCardProps
  extends Pick<GiftCardSettingsExpirySelectProps, 'errors'> {
  data: GiftCardSettingsFormData;
  disabled: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const GiftCardExpirySettingsCard: FC<GiftCardExpirySettingsCardProps> = ({
  data,
  disabled,
  errors,
  onChange,
}) => {
  return (
    <Card data-test-id="gift-card-settings">
      <CardTitle
        title={m.dashboard_expiryDateTitle() ?? messages.expiryDateTitle.defaultMessage}
      />
      <CardContent>
        <GiftCardSettingsExpirySelect
          expiryPeriodActive={data?.expiryPeriodActive}
          expiryPeriodType={data?.expiryPeriodType}
          expiryPeriodAmount={data?.expiryPeriodAmount}
          change={onChange}
          disabled={disabled}
          errors={errors}
        />
      </CardContent>
    </Card>
  );
};

GiftCardExpirySettingsCard.displayName = 'GiftCardExpirySettingsCard';
export default GiftCardExpirySettingsCard;
