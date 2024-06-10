import { useTranslation } from '@core/i18n';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { createGiftCardExpirySelectMessages as messages } from './messages';
import RadioGroupField from '@dashboard/components/fields/RadioGroupField';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import TimePeriodField from '@dashboard/components/giftCards/TimePeriodField';
import useCurrentDate from '@dashboard/hooks/useCurrentDate';
import type { FormChange } from '@dashboard/hooks/useForm';
import type {
  GiftCardBulkCreateFormErrors,
  GiftCardCreateCommonFormData,
} from '@dashboard/oldSrc/giftCards/GiftCardBulkCreateDialog/types';
import type { GiftCardExpiryType } from '@dashboard/oldSrc/giftCards/GiftCardCreateDialog/types';
import { getExpiryPeriodTerminationDate } from '@dashboard/oldSrc/giftCards/GiftCardCreateDialog/utils';
import { getGiftCardErrorMessage } from '@dashboard/oldSrc/giftCards/GiftCardUpdate/messages';

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
  const { t } = useTranslation();

  const translatedOptions = options.map(({ label, value }) => ({
    value,
    label: t(label),
  }));

  const currentDate = useCurrentDate();

  return (
    <>
      <ControlledCheckbox
        name={'expirySelected'}
        label={t('dashboard.expirySelectedLabel', messages.expirySelectedLabel.defaultMessage)}
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
              label={t('dashboard.expiryDateLabel', messages.expiryDateLabel.defaultMessage)}
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
                  {t('dashboard.expiryOnLabel', messages.expiryOnLabel.defaultMessage)}
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
