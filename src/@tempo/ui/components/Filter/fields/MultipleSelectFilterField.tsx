import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';

// import useStyles from '../styles';
import type { FilterData } from '../types';
import { useFilterActions } from '@tempo/ui/components/Filter/context';
import { Chip } from '@tempo/ui/components/chip/Chip';

export interface FilterContentProps {
  filter: FilterData;
}

export const MultipleSelectFilterField: FC<FilterContentProps> = ({ filter }) => {
  // const styles = useStyles();

  const styles = {};
  const { onChange } = useFilterActions();
  const [displayValues] = useState(filter.options.displayValues || filter.options.choices);

  const { name, options } = filter;
  const { choices } = options;

  const handleChoiceChange = (event: SelectChangeEvent<unknown>) =>
    onChange(name, event.target.value as string);

  return (
    <Select
      className={styles.filterValue ?? ''}
      classes={
        {
          // root: styles.filterMultipleValueInputInner ?? '',
        }
      }
      multiple
      variant="outlined"
      onChange={handleChoiceChange}
      value={filter.values}
      renderValue={(values) => {
        const typedValues = values as string[];

        return (
          <div className={styles.filterChipContainer ?? ''}>
            {typedValues.map((value) => (
              <Chip className={styles.filterChip ?? ''} key={value}>
                {displayValues?.find((dv) => dv.value === value)?.label ?? value}
              </Chip>
            ))}
          </div>
        );
      }}
    >
      {choices!.map((choice) => {
        const active = filter.values!.includes(choice.value);

        return (
          <MenuItem
            key={choice.value}
            className={clsx(active && styles.filterValueSelected)}
            value={choice.value}
          >
            <Checkbox checked={active} className={styles.filterValueCheckbox ?? ''} />
            {choice.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};
MultipleSelectFilterField.displayName = 'MultipleSelectFilterField';
