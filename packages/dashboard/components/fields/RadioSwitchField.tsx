import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import type { FormControlProps } from '@mui/material/FormControl';
import FormControl from '@mui/material/FormControl';
import clsx from 'clsx';
import type { ChangeEvent, FC, ReactNode } from 'react';

interface RadioSwitchFieldProps extends FormControlProps {
  classes?: Record<'radioLabel', string>;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  firstOptionLabel: ReactNode;
  name?: string;
  secondOptionLabel: ReactNode;
  value?: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
}

export const RadioSwitchField: FC<RadioSwitchFieldProps> = ({
  classes: overrideClasses,
  className,
  disabled,
  error,
  firstOptionLabel,
  onChange,
  name,
  secondOptionLabel,
  value,
  ...rest
}) => {
  const initialValue = value ? 'true' : 'false';

  const change = (event) => {
    onChange({
      target: {
        name: event.target.name,
        value: event.target.value === 'true' ? true : false,
      },
    } as unknown);
  };

  return (
    <FormControl
      className={clsx(className)}
      sx={{
        padding: 0,
        width: '100%',
        ...rest.sx,
      }}
      error={error}
      disabled={disabled}
      {...rest}
    >
      <RadioGroup
        aria-label={name}
        name={name}
        value={initialValue}
        onChange={(event) => change(event)}
      >
        <FormControlLabel
          value="true"
          className={clsx(overrideClasses?.radioLabel)}
          sx={{
            '& > span': {
              paddingTop: (theme) => theme.spacing(1),
              paddingBottom: (theme) => theme.spacing(1),
            },
          }}
          control={<Radio color="secondary" />}
          label={firstOptionLabel}
          name={name}
        />
        <FormControlLabel
          value="false"
          className={clsx(overrideClasses?.radioLabel)}
          sx={{
            '& > span': {
              paddingTop: (theme) => theme.spacing(1),
              paddingBottom: (theme) => theme.spacing(1),
            },
          }}
          control={<Radio color="secondary" />}
          label={secondOptionLabel}
          name={name}
        />
      </RadioGroup>
    </FormControl>
  );
};
RadioSwitchField.displayName = 'RadioSwitchField';
export default RadioSwitchField;
