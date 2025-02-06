import MenuItem from '@mui/material/MenuItem';
import type { FC } from 'react';
import type { FilterData } from '../types';
import styles from './MultipleValueAutocompleteFilterField.module.css';
import { useFilterActions } from '@tempo/ui/components/Filter/context';
import { MultipleValueAutocomplete } from '@tempo/ui/components/inputs/MultipleValueAutocomplete';
import type { SyntheticChangeEvent } from '@tempo/ui/utils';

// import useStyles from '../styles';

export interface FilterContentProps {
  filter: FilterData;
}

export const MultipleValueAutocompleteFilterField: FC<FilterContentProps> = ({ filter }) => {
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
