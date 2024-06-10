import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import GiftCardSettingsExpirySelect from '@dashboard/components/giftCards/GiftCardSettingsExpirySelect';
import type { GiftCardSettingsExpirySelectProps } from '@dashboard/components/giftCards/GiftCardSettingsExpirySelect';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { ChangeEvent, FC } from 'react';

import type { GiftCardSettingsFormData } from '../types';
import { giftCardExpirySettingsCard as messages } from './messages';

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
  const { t } = useTranslation();

  return (
    <Card data-test-id="gift-card-settings">
      <CardTitle
        title={t('dashboard.expiryDateTitle', messages.expiryDateTitle.defaultMessage)}
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
