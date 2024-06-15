import * as m from '@paraglide/messages';
import type { DateTimeI } from '@tempo/next/types/datetime';
import { joinDateTime, splitDateTime } from '@tempo/utils/datetime';
import ErrorNoticeBar from '@tempo/dashboard/components/bars/ErrorNoticeBar';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import type { ReactNode, FC } from 'react';
import { useEffect, useState } from 'react';

import styles from './index.module.css';

type DateTimeFieldProps = Omit<TextFieldProps, 'label' | 'error'> & {
  onChange: (value: string) => void;
  error: string | ReactNode;
  setError?: () => void;
  futureDatesOnly?: boolean;
  value: Maybe<string>;
};

export const DateTimeTimezoneField: FC<DateTimeFieldProps> = ({
  disabled,
  name,
  onChange,
  error,
  fullWidth,
  value: initialValue,
  helperText,
}) => {
  const [value, setValue] = useState<DateTimeI>(
    initialValue ? splitDateTime(initialValue) : { date: '', time: '' }
  );

  useEffect(() => {
    const newDate = joinDateTime(value.date, value.time);
    onChange(newDate);
  }, [value]);

  return (
    <>
      <TextField
        className={styles.dateInput ?? ''}
        fullWidth={fullWidth}
        disabled={disabled}
        error={!!error}
        label={m.dashboard_date() ?? 'Date'}
        name={`${name}:date`}
        onChange={(event) => {
          const date = event.target.value;
          setValue((value) => ({ ...value, date }));
        }}
        type="date"
        value={value.date}
        helperText={helperText}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth={fullWidth}
        disabled={disabled}
        error={!!error}
        label={m.dashboard_time() ?? 'Time'}
        name={`${name}:time`}
        onChange={(event) => {
          const time = event.target.value;
          setValue((value) => ({ ...value, time }));
        }}
        type="time"
        value={value.time}
        InputLabelProps={{ shrink: true }}
      />

      {error && <ErrorNoticeBar className={styles.errorNoticeBar ?? ''} message={error} />}
    </>
  );
};
