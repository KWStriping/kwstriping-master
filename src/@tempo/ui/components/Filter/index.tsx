import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { difference, uniqBy } from 'lodash-es';
import { useRef, useEffect } from 'react';
import type { FC } from 'react';

import { useFilterActions, useFilterData } from './context';
import { FilterContent } from './FilterContent';
// import useStyles from './styles';

import type { FilterDetailedOptions, FilterLabels, FilterOptions } from './types';
import { FilterType } from './types';
import * as utils from './utils';
import IconButton from '@tempo/ui/components/buttons/IconButton';

export type FilterProps = FilterOptions & FilterDetailedOptions;

export const Filter: FC<FilterProps> = ({ name: nameProp, label, ...options }) => {
  console.log('Filter', { nameProp, label, options });
  const name = utils.getFilterName(nameProp, options);
  if (!name) throw new Error('Filter name is required');
  const filters = useFilterData();
  const { register, set, unregister } = useFilterActions();
  const registered = useRef(false);
  const filter = filters.find((fd) => fd.name === name);

  useEffect(() => {
    console.log('registering', name);
    console.log('>>>>>>', register);
    register(name, label, options);
    registered.current = true;
    return () => unregister(name);
  }, []);

  useEffect(() => {
    if (
      registered.current &&
      options.choices !== undefined &&
      filter?.options?.choices &&
      difference(options.choices, filter.options.choices).length
    ) {
      set(name, {
        options: {
          ...options,
          choices: options.choices,
        },
      });
    }
  }, [options.choices]);

  return null;
};

export interface FilterRowProps {
  first: boolean;
  name: string;
  labels: FilterLabels;
}
export const FilterRow: FC<FilterRowProps> = ({ first, name, labels }) => {
  // const styles = useStyles();
  const styles = {};
  const filters = useFilterData();
  const { toggle, toggleRange, swap } = useFilterActions();

  const filter = filters.find((filter) => filter.name === name);

  if (!filter?.active) return null;

  const availableFilters = utils.getAvailableFilters(filters);
  const options = uniqBy([filter.options.group ?? filter, ...availableFilters], 'name');
  const groupOptions = [
    filter,
    ...filters.filter(
      (f) =>
        f.name !== filter.name &&
        f.options.group?.name === filter.options.group?.name &&
        !f.active
    ),
  ];

  const change = (event: SelectChangeEvent<unknown>) => {
    const targetFilterName = event.target.value as string;

    swap(name, targetFilterName);
  };

  const selectProps: SelectProps = {
    classes: {
      // selectMenu: styles.filterInputInner ?? '',
    },
    variant: 'outlined',
  };

  return (
    <div className={styles.filter ?? ''}>
      <div className={styles.filterOptions ?? ''}>
        <Typography className={styles.filterConjunction ?? ''}>
          {first ? labels.where : labels.and}
        </Typography>
        <Select
          {...selectProps}
          className={styles.filterName ?? ''}
          onChange={change}
          value={filter.options.group?.name ?? filter.name}
        >
          {options.map((option) => (
            <MenuItem key={option.name} value={option.name}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {!!filter.options.group && (
          <Select
            {...selectProps}
            className={styles.filterName ?? ''}
            onChange={change}
            value={filter.name}
          >
            {groupOptions.map((option) => (
              <MenuItem key={option.name} value={option.name}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
        <Select
          {...selectProps}
          disabled={filter.options.type !== FilterType.Range}
          className={styles.filterRange ?? ''}
          value={filter.range.toString()}
          onChange={() => toggleRange(name)}
        >
          <MenuItem value="false">{labels.is}</MenuItem>
          <MenuItem value="true">{labels.range}</MenuItem>
        </Select>
      </div>
      <FilterContent filter={filter} labels={labels} />
      <div className={styles.filterDeleteContainer ?? ''}>
        <IconButton
          // color="secondary"
          className={styles.filterDelete ?? ''}
          onClick={() => toggle(name)}
          size="large"
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Filter;

export * from './FilterBar';
export * from './types';
export * from './utils';
