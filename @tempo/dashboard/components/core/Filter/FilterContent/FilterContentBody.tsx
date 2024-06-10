import { makeStyles } from '@tempo/ui/theme/styles';
import { FilterDateTimeField } from '@tempo/dashboard/components/core/Filter/FilterContent/FilterDateTimeField';
import { FilterNumericField } from '@tempo/dashboard/components/core/Filter/FilterContent/FilterNumericField';
import { FilterSingleSelectField } from '@tempo/dashboard/components/core/Filter/FilterContent/FilterSingleSelectField';
import { useCommonStyles } from '@tempo/dashboard/components/core/Filter/FilterContent/utils';
import FilterOptionField from '@tempo/dashboard/components/core/Filter/FilterOptionField';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import type { SetStateAction, Dispatch, ReactNode } from 'react';
import type { FilterAutocompleteDisplayValues } from '../FilterAutocompleteField';
import FilterAutocompleteField from '../FilterAutocompleteField';
import { FilterKeyValueField } from '../FilterKeyValueField';

import type { FilterReducerAction } from '../reducer';
import type { FilterElement } from '../types';
import { FieldType, isFilterDateType, isFilterNumericType, isFilterType } from '../types';

const useStyles = makeStyles(
  (theme) => ({
    option: {
      left: -theme.spacing(0.5),
      position: 'relative',
    },
    optionRadio: {
      left: -theme.spacing(0.25),
    },
  }),
  { name: 'FilterContentBody' }
);

const filterTestingContext = 'filter-field-';

export interface FilterContentBodyProps<K extends string> {
  children?: ReactNode;
  filter: FilterElement<K>;
  currencySymbol?: string;
  initialAutocompleteDisplayValues: FilterAutocompleteDisplayValues;
  onFilterPropertyChange: <T extends FieldType>(value: FilterReducerAction<K, T>) => void;
  autocompleteDisplayValues: FilterAutocompleteDisplayValues;
  setAutocompleteDisplayValues: Dispatch<
    SetStateAction<Record<string, MultiAutocompleteChoiceType[]>>
  >;
}

const FilterContentBody = <K extends string = string>({
  filter,
  children,
  currencySymbol,
  onFilterPropertyChange,
  autocompleteDisplayValues,
  setAutocompleteDisplayValues,
  initialAutocompleteDisplayValues,
}: FilterContentBodyProps<K>) => {
  const commonClasses = useCommonStyles({});
  // const styles = useStyles();
  const styles = {};
  if (!filter) {
    return <Skeleton />;
  }

  return (
    <div className={'bg-primary/10 px-2 py-3'}>
      {children}
      {isFilterType(filter, FieldType.text) && (
        <TextField
          data-test-id={filterTestingContext + filter.name}
          fullWidth
          name={filter.name}
          InputProps={{ classes: { input: commonClasses.input } }}
          value={filter.value[0]}
          onChange={(event) =>
            onFilterPropertyChange<FieldType.text>({
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
      )}
      {isFilterDateType(filter) && (
        <>
          <FilterSingleSelectField
            filter={filter}
            onFilterPropertyChange={onFilterPropertyChange}
          />
          <FilterDateTimeField filter={filter} onFilterPropertyChange={onFilterPropertyChange} />
        </>
      )}
      {isFilterNumericType(filter) && (
        <>
          <FilterSingleSelectField
            filter={filter}
            onFilterPropertyChange={onFilterPropertyChange}
          />
          <FilterNumericField
            filter={filter}
            onFilterPropertyChange={onFilterPropertyChange}
            currencySymbol={currencySymbol}
          />
        </>
      )}

      {isFilterType(filter, FieldType.options) && (
        <FilterOptionField
          data-test-id={filterTestingContext + filter.name}
          filter={filter}
          onFilterPropertyChange={onFilterPropertyChange}
        />
      )}
      {isFilterType(filter, FieldType.boolean) &&
        filter.options.map((option) => (
          <div className={clsx(styles.option, styles.optionRadio)} key={option.value}>
            <FormControlLabel
              control={
                <Radio
                  data-test-id="filter-boolean"
                  data-test-is-checked={filter.value[0] === option.value}
                  checked={filter.value[0] === option.value}
                  color="secondary"
                />
              }
              label={option.label}
              name={filter.name}
              onChange={() =>
                onFilterPropertyChange({
                  payload: {
                    name: filter.name,
                    update: {
                      value: [option.value],
                    },
                  },
                  type: 'set-property',
                })
              }
            />
          </div>
        ))}
      {isFilterType(filter, FieldType.keyValue) && (
        <FilterKeyValueField filter={filter} onFilterPropertyChange={onFilterPropertyChange} />
      )}
      {isFilterType(filter, FieldType.autocomplete) && (
        <FilterAutocompleteField
          data-test-id={filterTestingContext + filter.name}
          displayValues={autocompleteDisplayValues}
          filter={filter}
          setDisplayValues={setAutocompleteDisplayValues}
          onFilterPropertyChange={onFilterPropertyChange}
          initialDisplayValues={initialAutocompleteDisplayValues}
        />
      )}
    </div>
  );
};

export default FilterContentBody;
