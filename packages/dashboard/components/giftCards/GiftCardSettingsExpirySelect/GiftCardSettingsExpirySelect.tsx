import { useTranslation } from '@core/i18n';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import TimePeriodField from '../TimePeriodField/TimePeriodField';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import type { GiftCardSettingsErrorFragment, TimePeriod } from '@core/api/graphql';
import type { FormChange } from '@dashboard/hooks/useForm';
import { getGiftCardSettingsErrorMessage } from '@dashboard/oldSrc/giftCards/GiftCardSettings/messages';

// import { giftCardSettingsExpirySelectMessages as messages } from "./messages";

export interface GiftCardSettingsExpirySelectProps {
  change: FormChange;
  disabled: boolean;
  expiryPeriodActive: boolean;
  expiryPeriodType: TimePeriod;
  expiryPeriodAmount: number;
  errors?: Record<'expiryPeriod', GiftCardSettingsErrorFragment>;
}

const GiftCardSettingsExpirySelect: FC<GiftCardSettingsExpirySelectProps> = ({
  errors,
  change,
  disabled,
  expiryPeriodActive,
  expiryPeriodType,
  expiryPeriodAmount,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <ControlledCheckbox
        name={'expiryPeriodActive'}
        label={
          <>
            {t('dashboard.etExpirationPeriodTitle', 'Set gift card expiration period')}
            <Typography variant="caption">
              {t(
                'dashboard.etExpirationPeriodDescription',
                'Expiration date will be automatically set, once gift card is issued'
              )}
            </Typography>
          </>
        }
        checked={expiryPeriodActive}
        onChange={change}
        disabled={disabled}
        data-test-id="expiry-period-active"
      />

      {expiryPeriodActive && (
        <>
          <TimePeriodField
            isError={!!errors?.expiryPeriod}
            helperText={getGiftCardSettingsErrorMessage(errors?.expiryPeriod, t)}
            change={change}
            periodType={expiryPeriodType}
            periodAmount={expiryPeriodAmount}
            amountFieldName={'expiryPeriodAmount'}
            typeFieldName={'expiryPeriodType'}
          />
        </>
      )}
    </>
  );
};

export default GiftCardSettingsExpirySelect;
