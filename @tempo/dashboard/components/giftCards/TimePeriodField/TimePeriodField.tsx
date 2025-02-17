import * as m from '@paraglide/messages';
import { TimePeriod } from '@tempo/api/generated/constants';
import type { FC } from 'react';
import TextWithSelectField from '@tempo/dashboard/components/fields/TextWithSelectField';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';

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
  const options = [
    {
      label: m.dashboard_earLabel() ?? 'years after issue',
      value: TimePeriod.Year,
    },
    {
      label: m.dashboard_onthLabel() ?? 'months after issue',
      value: TimePeriod.Month,
    },
    {
      label: m.dashboard_eekLabel() ?? 'weeks after issue',
      value: TimePeriod.Week,
    },
    {
      label: m.dashboard_ayLabel() ?? 'days after issue',
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
