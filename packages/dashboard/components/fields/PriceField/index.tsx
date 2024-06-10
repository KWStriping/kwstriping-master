import type { InputProps } from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import styles from './index.module.css';

import { usePriceField } from './usePriceField';

interface PriceFieldProps {
  className?: string;
  currencySymbol?: string;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
  label?: string;
  name?: string;
  value?: string;
  InputProps?: InputProps;
  inputProps?: InputProps['inputProps'];
  required?: boolean;
  onChange(event: unknown);
}

export const PriceField: FC<PriceFieldProps> = (props) => {
  const {
    className,
    disabled,
    error,
    label,
    hint = '',
    currencySymbol,
    name,
    onChange: onChangeBase,
    required,
    value,
    InputProps,
    inputProps,
  } = props;
  const { onChange, onKeyDown, minValue, step } = usePriceField(currencySymbol, onChangeBase);

  return (
    <TextField
      className={className}
      error={error}
      helperText={hint}
      label={label}
      fullWidth
      value={value}
      InputProps={{
        ...InputProps,
        endAdornment: currencySymbol ? (
          <InputAdornment position="end" className={styles.currencySymbol ?? ''}>
            {currencySymbol}
          </InputAdornment>
        ) : (
          <span />
        ),
        inputProps: {
          min: 0,
          step,
          ...InputProps?.inputProps,
        },
        type: 'number',
      }}
      inputProps={{
        min: minValue,
        type: 'number',
        ...inputProps,
      }}
      name={name}
      disabled={disabled}
      required={required}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};
PriceField.defaultProps = {
  name: 'price',
};

PriceField.displayName = 'PriceField';
export default PriceField;
