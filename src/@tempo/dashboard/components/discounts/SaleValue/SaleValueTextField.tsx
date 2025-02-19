import * as m from '@paraglide/messages';
import { SaleType } from '@tempo/api/generated/constants';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';

import type { ChannelSaleFormData } from '../SaleDetailsPage';
import type { SaleValueInputOnChangeType } from './types';

interface SaleValueTextFieldProps {
  dataType: SaleType;
  helperText: string;
  disabled: boolean;
  error: boolean;
  listing: ChannelSaleFormData;
  onChange: SaleValueInputOnChangeType;
}

const SaleValueTextField: FC<SaleValueTextFieldProps> = ({
  dataType,
  helperText,
  disabled,
  error,
  listing,
  onChange,
}) => {
  const { id, percentageValue, fixedValue } = listing;

  const getTextFieldValue = (dataType: SaleType) =>
    dataType === SaleType.Percentage ? percentageValue : fixedValue;

  return (
    <TextField
      disabled={disabled}
      helperText={helperText || ''}
      error={error}
      name="value"
      onChange={(e) => {
        onChange(id, e.target.value);
      }}
      label={
        m.dashboard__g_Ry() ?? 'Discount Value'
        // sale discount
      }
      value={getTextFieldValue(dataType) || ''}
      type="number"
      fullWidth
      inputProps={{
        min: 0,
      }}
      InputProps={{
        endAdornment: dataType === SaleType.Fixed ? listing.currency : '%',
      }}
    />
  );
};

export default SaleValueTextField;
