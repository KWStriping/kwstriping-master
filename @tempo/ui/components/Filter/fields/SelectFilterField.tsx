import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import type { FC } from 'react';

// import useStyles from '../styles';
import type { FilterData } from '../types';
import styles from './SelectFilterField.module.css';
import { useFilterActions } from '@tempo/ui/components/Filter/context';

export interface FilterContentProps {
  filter: FilterData;
}

export const SelectFilterField: FC<FilterContentProps> = ({ filter }) => {
  const { onChange } = useFilterActions();

  const { name, options } = filter;
  const { choices } = options;

  const handleChoiceChange = (event: SelectChangeEvent) =>
    onChange(name, event.target.value as string);

  return (
    <Select
      className={styles.filterValue ?? ''}
      classes={
        {
          // selectMenu: styles.filterInputInner ?? '',
        }
      }
      variant="outlined"
      onChange={handleChoiceChange}
      value={filter.value as string}
    >
      {choices!.map((choice) => (
        <MenuItem key={choice.value} value={choice.value}>
          {choice.label}
        </MenuItem>
      ))}
    </Select>
  );
};
SelectFilterField.displayName = 'SelectFilterField';
