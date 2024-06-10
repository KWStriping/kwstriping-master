import * as m from '@paraglide/messages';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';

import type { FilterFieldBaseProps } from '../types';
import { FieldType } from '../types';
import { filterTestingContext } from './utils';

export type FilterRangeFieldProps = FilterFieldBaseProps<
  string,
  FieldType.price | FieldType.date
> & {
  currencySymbol: string;
};

const FilterRangeField: FC<FilterRangeFieldProps> = ({
  currencySymbol,
  filter,
  onFilterPropertyChange,
}) => {
  return (
    <>
      <TextField
        data-test-id={filterTestingContext + filter.name}
        data-test-range-type="min"
        fullWidth
        name={filter.name + '_min'}
        InputProps={{
          classes: {
            input: styles.fieldInput ?? '',
          },
          endAdornment: filter.type === FieldType.price && currencySymbol,
          type: filter.type === FieldType.date ? 'date' : 'number',
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
      <span className={styles.andLabel ?? ''}>
        <>
          {/* filter range separator */}

          {m.dashboard__F_Jk() ?? 'and'}
        </>
      </span>
      <TextField
        data-test-id={filterTestingContext + filter.name}
        data-test-range-type="max"
        fullWidth
        name={filter.name + '_max'}
        InputProps={{
          classes: {
            input: styles.fieldInput ?? '',
          },
          endAdornment: filter.type === FieldType.price && currencySymbol,
          type: filter.type === FieldType.date ? 'date' : 'number',
        }}
        value={filter.value[1]}
        onChange={(event) =>
          onFilterPropertyChange({
            payload: {
              name: filter.name,
              update: {
                value: [filter.value[0], event.target.value],
              },
            },
            type: 'set-property',
          })
        }
      />
    </>
  );
};
