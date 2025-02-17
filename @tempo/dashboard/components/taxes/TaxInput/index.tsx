import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import type TextFieldProps from '@mui/material/TextFieldProps';
import type { FC } from 'react';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import { findPriceSeparator } from '@tempo/dashboard/components/fields/PriceField/utils';

interface TaxInputProps {
  placeholder?: string;
  value: string | undefined;
  change: FormChange;
}

export const TaxInput: FC<TaxInputProps> = ({ placeholder, value, change }) => {
  const handleChange: FormChange = (e) => {
    let value = e.target.value;
    const splitCharacter = findPriceSeparator(value);
    const [integerPart, decimalPart] = value.split(splitCharacter);

    if (decimalPart?.length > 3) {
      const shortenedDecimalPart = decimalPart.slice(0, 3);
      value = `${integerPart}${splitCharacter}${shortenedDecimalPart}`;
    }

    change({
      target: {
        name: e.target.name,
        value,
      },
    });
  };
  const handleKeyDown: TextFieldProps['onKeyDown'] = (event) => {
    switch (event.key.toLowerCase()) {
      case 'e':
      case '-': {
        event.preventDefault();
        break;
      }
    }
  };

  return (
    <TextField
      type="number"
      fullWidth
      placeholder={placeholder}
      value={value}
      InputProps={{
        startAdornment: <InputAdornment position="start">%</InputAdornment>,
        className: styles.hideSpinboxes ?? '',
      }}
      inputProps={{
        className: styles.inputPadding ?? '',
        min: 0,
        max: 100,
        step: 0.001,
      }}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default TaxInput;
