import { useTranslation } from '@core/i18n';
import { joinDateTime } from '@core/utils/datetime';

import { Temporal } from '@js-temporal/polyfill';
import Box from '@mui/material/Box';
import Label from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import type { FC } from 'react';

type DateTimeFieldProps = Omit<TextFieldProps, 'error' | 'onChange'> & {
  onChange: (value: string) => void;
  error?: { message?: Maybe<string> };
  value: string;
  minDate?: string | Temporal.PlainDate;
  maxDate?: string | Temporal.PlainDate;
  tz?: string;
};

export const DateTimeField: FC<DateTimeFieldProps> = ({
  label,
  disabled,
  error,
  name,
  onChange,
  value,
  helperText,
  minDate: _minDate,
  maxDate: _maxDate,
  className,
  tz,
}) => {
  const { t } = useTranslation();
  const dateTime = value
    ? tz
      ? Temporal.ZonedDateTime.from(value)
      : Temporal.PlainDateTime.from(value)
    : null;
  const dateString = dateTime?.toPlainDate().toString() ?? '';
  const timeString = dateTime?.toPlainTime().toString() ?? '';
  const minDate = _minDate ? Temporal.PlainDate.from(_minDate).toString() : undefined;
  const maxDate = _maxDate ? Temporal.PlainDate.from(_maxDate).toString() : undefined;
  return (
    <div className={className}>
      {label && <Label className={'block mb-2'}>{label}</Label>}
      <Box className={'flex flex-wrap gap-y-2'} sx={{ '& *': { cursor: 'pointer' } }}>
        <TextField
          variant="outlined"
          className={'grow'}
          disabled={!!disabled}
          error={!!error}
          helperText={helperText}
          label={t('date', 'Date')}
          name={`${name}:date`}
          onChange={(event) => {
            // console.log('event.target.value', event.target.value);
            const newDateString = event.target.value;
            onChange(joinDateTime(newDateString, timeString) ?? '');
          }}
          type="date"
          value={dateString}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            inputProps: {
              min: minDate,
              max: maxDate,
            },
            classes: {
              root: 'rounded-r-none',
            },
          }}
        />
        <TextField
          variant="outlined"
          className={'grow'}
          disabled={!!disabled}
          error={!!error}
          // helperText={helperText}
          label={t('time', 'Time')}
          name={`${name}:time`}
          onChange={(event) => {
            const newTimeString = event.target.value;
            onChange(joinDateTime(dateString, newTimeString) ?? '');
          }}
          type="time"
          value={timeString}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            classes: {
              root: 'rounded-l-none',
            },
          }}
        />
      </Box>
    </div>
  );
};

export default DateTimeField;
