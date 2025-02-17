import * as m from '@paraglide/messages';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import type { GiftCardSettingsErrorFragment, TimePeriod } from '@tempo/api/generated/graphql';
import TimePeriodField from '../TimePeriodField/TimePeriodField';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import { getGiftCardSettingsErrorMessage } from '@tempo/dashboard/oldSrc/giftCards/GiftCardSettings/messages';

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
  return (
    <>
      <ControlledCheckbox
        name={'expiryPeriodActive'}
        label={
          <>
            {m.dashboard_etExpirationPeriodTitle() ?? 'Set gift card expiration period'}
            <Typography variant="caption">
              {m.dashboard_etExpirationPeriodDescription() ??
                'Expiration date will be automatically set, once gift card is issued'}
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
