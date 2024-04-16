import type { CountryCode } from '@core/api';
import stateNames from '@data/stateNames.json';
import Autocomplete from '@mui/material/Autocomplete';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import type { FC, RefCallback, RefObject } from 'react';
import { useState, useMemo } from 'react';
import { objectEntries } from 'tsafe/objectEntries';

export type StateCode = keyof typeof stateNames;

interface StateAutocompleteFieldProps extends Pick<TextFieldProps, 'helperText' | 'disabled'> {
  allowedStates?: StateCode[];
  value?: Maybe<string | CountryCode>;
  onChange: (value: StateCode | null) => void;
  id?: string;
  name?: string;
  label: string;
  inputRef?: RefObject<HTMLInputElement> | RefCallback<HTMLInputElement>;
  error?: string;
}

export const StateAutocompleteField: FC<StateAutocompleteFieldProps> = ({
  allowedStates = [],
  value: _stateCode,
  error,
  onChange,
  id,
  name,
  label,
  inputRef,
  helperText,
  disabled,
  ...props
}) => {
  console.log('>>> StateAutocompleteField', _stateCode, allowedStates);
  const [open, setOpen] = useState(false);
  const options = useMemo(
    () =>
      objectEntries<Record<StateCode, string>>(stateNames)
        .filter(([code]) => !allowedStates?.length || allowedStates.includes(code))
        .map(([code, name]) => {
          return { code, name };
        }),
    [allowedStates]
  );
  const defaultStateCode = allowedStates.length === 1 ? allowedStates[0] : null;
  const stateCode = _stateCode || defaultStateCode;
  const selectedOption = stateCode ? options.find((s) => s.code === stateCode) : null;
  // console.log('state.stateCode', stateCode);
  // console.log('state.selectedOption', selectedOption);
  return (
    <Autocomplete
      id={id}
      fullWidth
      options={options}
      value={selectedOption}
      blurOnSelect={true}
      open={open}
      onChange={(_event, newValue) => {
        console.log('Autocomplete.newValue', newValue);
        onChange(newValue?.code ?? null);
      }}
      getOptionLabel={(option) => option?.name ?? ''}
      isOptionEqualToValue={(option, value) => {
        // console.log('isOptionEqualToValue.value', value, _isOptionEqualToValue);
        return typeof value === 'string' ? option.code === value : option.code === value?.code;
      }}
      {...props}
      autoSelect
      renderInput={({ inputProps, InputProps, ...params }) => {
        return (
          <TextField
            label={label}
            name={name}
            inputRef={inputRef}
            {...params}
            value={selectedOption?.name ?? null}
            onClick={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            InputProps={{
              ...InputProps,
              readOnly: allowedStates.length === 1,
            }}
            inputProps={{
              ...inputProps,
              autoComplete: 'state',
              style: { padding: 0 },
            }}
            autoComplete="state"
            helperText={error || helperText}
            disabled={disabled}
          />
        );
      }}
    />
  );
};

export default StateAutocompleteField;
