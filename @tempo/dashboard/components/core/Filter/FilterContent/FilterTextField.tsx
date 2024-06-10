import TextField from '@mui/material/TextField';
import type { FC } from 'react';

import type { FilterFieldBaseProps } from '../types';
import { FieldType } from '../types';
import { filterTestingContext } from './utils';

export type FilterTextFieldProps = FilterFieldBaseProps<
  string,
  FieldType.text | FieldType.price | FieldType.date
> & {
  currencySymbol: string | null;
};
const FilterTextField: FC<FilterTextFieldProps> = ({
  currencySymbol,
  filter,
  onFilterPropertyChange,
}) => {
  return (
    <TextField
      data-test-id={filterTestingContext + filter.name}
      fullWidth
      name={filter.name}
      InputProps={{
        classes: {
          input: styles.fieldInput ?? '',
        },
        endAdornment: filter.type === FieldType.price && currencySymbol,
        type:
          filter.type === FieldType.date
            ? 'date'
            : [FieldType.number, FieldType.price].includes(filter.type)
              ? 'number'
              : 'text',
      }}
      value={filter.value[0]}
      onChange={(event) =>
        onFilterPropertyChange({
          payload: {
            name: filter.name,
            update: {
              value: [event.target.value, filter.value[1]],
            },
          },
          type: 'set-property',
        })
      }
    />
  );
};

FilterTextField.displayName = 'FilterTextField';
export default FilterTextField;
