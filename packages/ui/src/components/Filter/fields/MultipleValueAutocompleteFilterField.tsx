import { useFilterActions } from '@core/ui/components/Filter/context';
import { MultipleValueAutocomplete } from '@core/ui/components/inputs/MultipleValueAutocomplete';
import type { SyntheticChangeEvent } from '@core/ui/utils';
import MenuItem from '@mui/material/MenuItem';
import type { FC } from 'react';

// import useStyles from '../styles';
import type { FilterData } from '../types';

export interface FilterContentProps {
  filter: FilterData;
}

export const MultipleValueAutocompleteFilterField: FC<FilterContentProps> = ({ filter }) => {
  // const styles = useStyles();

  const styles = {};
  const { onChange } = useFilterActions();

  const { name, options } = filter;

  if (options.choices === undefined) {
    throw new Error('FilterType.Autocomplete must be used with choices prop');
  }
  if (options.onInputChange === undefined) {
    throw new Error('FilterType.Autocomplete must be used with onInputChange prop');
  }

  const handleChoiceChange = (event: SyntheticChangeEvent<string[]>) =>
    onChange(name, event.target.value);

  return (
    <MultipleValueAutocomplete
      className={styles.filterValue ?? ''}
      choices={options.choices!}
      InputProps={{
        classes: {
          root: styles.filterMultipleValueInputInner ?? '',
        },
      }}
      onChange={handleChoiceChange}
      onInputChange={options.onInputChange}
      value={filter.values}
    >
      {({ choices: filteredChoices, getItemProps, highlightedIndex }) =>
        filteredChoices.map((choice, choiceIndex) => (
          <MenuItem
            key={choice.value}
            selected={highlightedIndex === choiceIndex}
            {...getItemProps({ item: choice, index: choiceIndex })}
          >
            {choice.label}
          </MenuItem>
        ))
      }
    </MultipleValueAutocomplete>
  );
};
MultipleValueAutocompleteFilterField.displayName = 'MultipleValueAutocompleteFilterField';
