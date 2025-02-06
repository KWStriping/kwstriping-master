import type { CountryCode } from '@tempo/api/generated/graphql';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type { FC, RefObject, RefCallback } from 'react';
import { useState } from 'react';

export interface CountryOption {
  code: CountryCode;
  name: string;
}

interface CountryAutocompleteFieldProps {
  allowedCountries: CountryOption[];
  value: CountryCode;
  onChange: (value: CountryCode | CountryOption) => void;
  id?: string;
  name?: string;
  label: string;
  inputRef?: RefObject<HTMLInputElement> | RefCallback<HTMLInputElement>;
  disabled?: boolean;
}

export const CountryAutocompleteField: FC<CountryAutocompleteFieldProps> = ({
  allowedCountries,
  value: countryCode,
  onChange,
  id,
  name,
  label,
  inputRef,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const defaultCountryCode =
    allowedCountries.length === 1 ? allowedCountries[0]!.code : undefined; // TODO
  const value = countryCode ?? defaultCountryCode;
  return (
    <Autocomplete
      id={id}
      fullWidth
      value={allowedCountries.find((c) => c.code === value)}
      blurOnSelect={true}
      open={open}
      onChange={(event, newValue) => {
        onChange(newValue ?? defaultCountryCode);
      }}
      onClick={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      disableClearable={true}
      options={allowedCountries}
      getOptionLabel={(option: CountryOption) => option?.name ?? ''}
      isOptionEqualToValue={(option, value) =>
        typeof value === 'string' ? option.code === value : option.code === value?.code
      }
      inputValue={allowedCountries.find((c) => c.code === value)?.name ?? ''}
      {...props}
      renderInput={({ inputProps, ...params }) => {
        return (
          <TextField
            label={label}
            name={name}
            className={allowedCountries.length === 1 ? 'hidden' : ''}
            type={allowedCountries.length === 1 ? 'hidden' : 'text'}
            inputRef={inputRef}
            {...params}
            inputProps={{
              ...inputProps,
              style: { padding: 0 },
            }}
          />
        );
      }}
    />
  );
};

export default CountryAutocompleteField;
