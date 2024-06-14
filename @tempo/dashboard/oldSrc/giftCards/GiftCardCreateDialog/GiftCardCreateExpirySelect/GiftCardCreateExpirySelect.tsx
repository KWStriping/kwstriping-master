import * as m from '@paraglide/messages';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { createGiftCardExpirySelectMessages as messages } from './messages';
import RadioGroupField from '@tempo/dashboard/components/fields/RadioGroupField';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import TimePeriodField from '@tempo/dashboard/components/giftCards/TimePeriodField';
import useCurrentDate from '@tempo/dashboard/hooks/useCurrentDate';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import type {
  GiftCardBulkCreateFormErrors,
  GiftCardCreateCommonFormData,
} from '@tempo/dashboard/oldSrc/giftCards/GiftCardBulkCreateDialog/types';
import type { GiftCardExpiryType } from '@tempo/dashboard/oldSrc/giftCards/GiftCardCreateDialog/types';
import { getExpiryPeriodTerminationDate } from '@tempo/dashboard/oldSrc/giftCards/GiftCardCreateDialog/utils';
import { getGiftCardErrorMessage } from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/messages';

// import { useGiftCardCreateExpirySelectStyles as useStyles } from "./styles";

interface UntranslatedOption {
  label: MessageDescriptor;
  value: GiftCardExpiryType;
}

const options: UntranslatedOption[] = [
  {
    label: messages.expiryPeriodLabel,
    value: 'EXPIRY_PERIOD',
  },
  {
    label: messages.expiryDateLabel,
    value: 'EXPIRY_DATE',
  },
];

interface GiftCardCreateExpirySelectProps {
  errors: GiftCardBulkCreateFormErrors;
  change: FormChange;
  data: Pick<
    GiftCardCreateCommonFormData,
    'expirySelected' | 'expiryPeriodType' | 'expiryPeriodAmount' | 'expiryType' | 'expiryDate'
  >;
}

const GiftCardCreateExpirySelect: FC<GiftCardCreateExpirySelectProps> = ({
  errors,
  change,
  data: { expirySelected, expiryPeriodType, expiryPeriodAmount, expiryType, expiryDate },
}) => {
  const translatedOptions = options.map(({ label, value }) => ({
    value,
    label: m[label] ?? '',
  }));

  const currentDate = useCurrentDate();

  return (
    <>
      <ControlledCheckbox
        name={'expirySelected'}
        label={m.dashboard_expirySelectedLabel() ?? messages.expirySelectedLabel.defaultMessage}
        checked={expirySelected}
        onChange={change}
      />
      {expirySelected && (
        <>
          <RadioGroupField
            innerContainerClassName={styles.radioGroupContainer}
            choices={translatedOptions}
            onChange={change}
            name={'expiryType'}
            value={expiryType}
            variant="inline"
          />

          {expiryType === 'EXPIRY_DATE' && (
            <TextField
              error={!!errors?.expiryDate}
              helperText={getGiftCardErrorMessage(errors?.expiryDate, t)}
              onChange={change}
              name={'expiryDate'}
              className={styles.dateField ?? ''}
              label={m.dashboard_expiryDateLabel() ?? messages.expiryDateLabel.defaultMessage}
              value={expiryDate}
              InputLabelProps={{
                shrink: true,
              }}
              type="date"
            />
          )}

          {expiryType === 'EXPIRY_PERIOD' && (
            <div className={styles.periodField ?? ''}>
              <TimePeriodField
                isError={!!errors?.expiryDate}
                helperText={getGiftCardErrorMessage(errors?.expiryDate, t)}
                change={change}
                periodType={expiryPeriodType}
                periodAmount={expiryPeriodAmount}
                amountFieldName={'expiryPeriodAmount'}
                typeFieldName={'expiryPeriodType'}
              />
              <div>
                <Typography variant="caption">
                  {m.dashboard_expiryOnLabel() ?? messages.expiryOnLabel.defaultMessage}
                </Typography>
                <Typography>
                  {getExpiryPeriodTerminationDate(
                    currentDate,
                    expiryPeriodType,
                    expiryPeriodAmount
                  )?.toFormat('ll')}
                </Typography>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default GiftCardCreateExpirySelect;
