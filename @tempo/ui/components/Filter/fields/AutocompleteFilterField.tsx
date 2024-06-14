import styles from './AutocompleteFilterField.module.css';
import { useFilterActions } from '@tempo/ui/components/Filter/context';
import { Autocomplete } from '@tempo/ui/components/inputs/Autocomplete';
import type { SyntheticChangeEvent } from '@tempo/ui/utils';
import MenuItem from '@mui/material/MenuItem';
import type { FC } from 'react';

// import useStyles from '../styles';
import type { FilterData } from '../types';

export interface FilterContentProps {
  filter: FilterData;
}

export const AutocompleteFilterField: FC<FilterContentProps> = ({ filter }) => {

  const { onChange } = useFilterActions();

  const { name, options } = filter;
  const { choices } = options;

  if (options.choices === undefined) {
    throw new Error('FilterType.Autocomplete must be used with choices prop');
  }
  if (options.onInputChange === undefined) {
    throw new Error('FilterType.Autocomplete must be used with onInputChange prop');
  }

  const handleChoiceChange = (event: SyntheticChangeEvent) => onChange(name, event.target.value);

  return (
    <Autocomplete
      className={styles.filterValue ?? ''}
      choices={options.choices!}
      InputProps={{
        classes: {
          input: styles.filterInputInner ?? '',
        },
      }}
      onChange={handleChoiceChange}
      onInputChange={options.onInputChange}
      value={filter.values}
    >
      {({ getItemProps, highlightedIndex }) =>
        choices!.map((choice, choiceIndex) => (
          <MenuItem
            key={choice.value}
            selected={highlightedIndex === choiceIndex}
            {...getItemProps({ item: choice, index: choiceIndex })}
          >
            {choice.label}
          </MenuItem>
        ))
      }
    </Autocomplete>
  );
};
AutocompleteFilterField.displayName = 'AutocompleteFilterField';
