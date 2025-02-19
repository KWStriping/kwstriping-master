import type { FC } from 'react';

import { AutocompleteFilterField } from './fields/AutocompleteFilterField';
import { MultipleSelectFilterField } from './fields/MultipleSelectFilterField';
import { MultipleValueAutocompleteFilterField } from './fields/MultipleValueAutocompleteFilterField';
import { RangeFilterField } from './fields/RangeFilterField';
import { SelectFilterField } from './fields/SelectFilterField';
import { TextFilterField } from './fields/TextFilterField';
import type { FilterData, FilterLabels } from './types';
import { FilterType } from './types';

export interface FilterContentProps {
  filter: FilterData;
  labels: FilterLabels;
}

export const FilterContent: FC<FilterContentProps> = ({ filter, labels }) => {
  const { options, range } = filter;
  const { type, multiple } = options;

  if (type === FilterType.Autocomplete) {
    if (multiple) {
      return <MultipleValueAutocompleteFilterField filter={filter} />;
    }
    return <AutocompleteFilterField filter={filter} />;
  } else if (type === FilterType.Choice) {
    if (multiple) {
      return <MultipleSelectFilterField filter={filter} />;
    }

    return <SelectFilterField filter={filter} />;
  } else if (type === FilterType.Range && range) {
    return <RangeFilterField filter={filter} labels={labels} />;
  }

  return <TextFilterField filter={filter} />;
};
FilterContent.displayName = 'FilterContent';
