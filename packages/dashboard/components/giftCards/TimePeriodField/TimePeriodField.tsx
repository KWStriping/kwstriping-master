import { useTranslation } from '@core/i18n';
import TextWithSelectField from '@dashboard/components/fields/TextWithSelectField';
import { TimePeriod } from '@core/api/constants';
import type { FormChange } from '@dashboard/hooks/useForm';
import type { FC } from 'react';

interface TimePeriodFieldProps {
  change: FormChange;
  periodAmount: number;
  periodType: TimePeriod;
  amountFieldName: string;
  typeFieldName: string;
  helperText?: string;
  isError?: boolean;
}

const TimePeriodField: FC<TimePeriodFieldProps> = ({
  change,
  periodAmount,
  periodType,
  amountFieldName,
  typeFieldName,
  helperText,
  isError,
}) => {
  const { t } = useTranslation();

  const options = [
    {
      label: t('dashboard.earLabel', 'years after issue'),
      value: TimePeriod.Year,
    },
    {
      label: t('dashboard.onthLabel', 'months after issue'),
      value: TimePeriod.Month,
    },
    {
      label: t('dashboard.eekLabel', 'weeks after issue'),
      value: TimePeriod.Week,
    },
    {
      label: t('dashboard.ayLabel', 'days after issue'),
      value: TimePeriod.Day,
    },
  ];

  return (
    <TextWithSelectField
      isError={isError}
      choices={options}
      change={change}
      helperText={helperText}
      textFieldProps={{
        type: 'number',
        name: amountFieldName,
        value: periodAmount,
        minValue: 0,
      }}
      selectFieldProps={{
        name: typeFieldName,
        value: periodType,
      }}
    />
  );
};

export default TimePeriodField;
