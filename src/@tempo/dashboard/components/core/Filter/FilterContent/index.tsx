import { Accordion, AccordionSummary } from '@tempo/ui/components/Accordion';
import { makeStyles } from '@tempo/ui/theme/styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { Ref, FC } from 'react';
import { forwardRef, useState } from 'react';
import type { FilterAutocompleteDisplayValues } from '../FilterAutocompleteField';

import type { FilterReducerAction } from '../reducer';
import type { FilterElement, FilterErrorMessages, IFilter, InvalidFilters } from '../types';
import { FieldType } from '../types';
import type { FilterContentBodyProps } from './FilterContentBody';
import FilterContentBody from './FilterContentBody';
import FilterContentBodyNameField from './FilterContentBodyNameField';
import FilterContentHeader from './FilterContentHeader';
import FilterErrorsList from './FilterErrorsList';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import CollectionWithDividers from '@tempo/dashboard/components/collections/CollectionWithDividers';

const useExpanderStyles = makeStyles(
  (theme) => ({
    btn: {
      marginRight: theme.spacing(1),
    },

    expanded: {},
    root: {
      boxShadow: 'none',
      margin: 0,
      padding: 0,

      '&:before': {
        content: 'none',
      },

      '&$expanded': {
        margin: 0,
        border: 'none',
      },
    },
  }),
  { name: 'FilterContentExpander' }
);

const useSummaryStyles = makeStyles(
  (theme) => ({
    expanded: {},
    root: {
      width: '100%',
      border: 'none',
      margin: 0,
      padding: 0,
      minHeight: 0,
      paddingRight: theme.spacing(2),

      '&$expanded': {
        minHeight: 0,
      },
    },
  }),
  { name: 'FilterContentExpanderSummary' }
);

export interface FilterContentProps<K extends string = string> {
  filters: IFilter<K>;
  onFilterPropertyChange: <T extends FieldType>(value: FilterReducerAction<K, T>) => void;
  onFilterAttributeFocus?: (id?: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  currencySymbol?: string;
  dataStructure: IFilter<K>;
  errors?: InvalidFilters<K>;
  errorMessages?: FilterErrorMessages<K>;
  ref?: Ref<HTMLDivElement>;
}

export const FilterContent: FC<FilterContentProps> = forwardRef(
  (
    {
      currencySymbol,
      errors,
      errorMessages,
      filters,
      onClear,
      onFilterPropertyChange,
      onFilterAttributeFocus,
      onSubmit,
      dataStructure,
    },
    ref
  ) => {
    const expanderClasses = useExpanderStyles({});
    const summaryClasses = useSummaryStyles({});

    const [openedFilter, setOpenedFilter] = useState<FilterElement<string>>();

    const getAutocompleteValuesWithNewValues = (
      autocompleteDisplayValues: FilterAutocompleteDisplayValues,
      filterField: FilterElement<string>
    ) => {
      if (filterField.type === FieldType.autocomplete) {
        return {
          ...autocompleteDisplayValues,
          [filterField.name]: filterField.options,
        };
      }

      return autocompleteDisplayValues;
    };

    const initialAutocompleteDisplayValues = filters.reduce((acc, filterField) => {
      if (filterField.multipleFields) {
        return filterField.multipleFields.reduce(getAutocompleteValuesWithNewValues, acc);
      }

      return getAutocompleteValuesWithNewValues(acc, filterField);
    }, {});

    const [autocompleteDisplayValues, setAutocompleteDisplayValues] =
      useStateFromProps<FilterAutocompleteDisplayValues>(initialAutocompleteDisplayValues);

    const commonFilterBodyProps: Omit<
      FilterContentBodyProps<string>,
      'filter' | 'onFilterPropertyChange'
    > = {
      currencySymbol,
      autocompleteDisplayValues,
      setAutocompleteDisplayValues,
      initialAutocompleteDisplayValues,
    };

    const handleFilterAttributeFocus = (filter?: FilterElement<string>) => {
      setOpenedFilter(filter);
      if (onFilterAttributeFocus) {
        onFilterAttributeFocus(filter?.id);
      }
    };

    const handleFilterOpen = (filter: FilterElement<string>) => {
      if (filter.name !== openedFilter?.name) {
        handleFilterAttributeFocus(filter);
      } else {
        handleFilterAttributeFocus(undefined);
      }
    };

    const handleFilterPropertyGroupChange = function <K extends string, T extends FieldType>(
      action: FilterReducerAction<K, T>,
      filter: FilterElement<string>
    ) {
      const switchToActive = action.payload.update.active;
      if (switchToActive && filter.name !== openedFilter?.name) {
        handleFilterAttributeFocus(filter);
      } else if (!switchToActive && filter.name === openedFilter?.name) {
        handleFilterAttributeFocus(undefined);
      }
      if (!switchToActive) {
        action.payload.update.value = [];
      }
      onFilterPropertyChange(action);
    };

    const handleMultipleFieldPropertyChange = function <K extends string, T extends FieldType>(
      action: FilterReducerAction<K, T>
    ) {
      const { update } = action.payload;
      onFilterPropertyChange({
        ...action,
        payload: { ...action.payload, update: { ...update, active: true } },
      });
    };

    const getFilterFromCurrentData = function <T extends string>(filter: FilterElement<T>) {
      return filters.find(({ name }) => filter.name === name);
    };

    return (
      <Paper elevation={8} ref={ref} className={'p-2'}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <FilterContentHeader onClear={onClear} />
          <Divider />
          {dataStructure
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((filter) => {
              const currentFilter = getFilterFromCurrentData(filter);

              return (
                <Accordion
                  key={filter.name}
                  classes={expanderClasses}
                  data-test-id={'channel-availability-item-' + filter.name}
                  expanded={filter.name === openedFilter?.name}
                >
                  <AccordionSummary
                    className={summaryClasses.root}
                    onClick={() => handleFilterOpen(filter)}
                  >
                    {currentFilter && (
                      <FilterContentBodyNameField
                        filter={currentFilter}
                        onFilterPropertyChange={(action) =>
                          handleFilterPropertyGroupChange(action, filter)
                        }
                      />
                    )}
                  </AccordionSummary>
                  {currentFilter?.active && (
                    <FilterErrorsList
                      errors={errors?.[filter.name]}
                      errorMessages={errorMessages}
                      filter={filter}
                    />
                  )}
                  {filter.multipleFields ? (
                    <CollectionWithDividers
                      collection={filter.multipleFields}
                      renderItem={(filterField) => (
                        <FilterContentBody
                          {...commonFilterBodyProps}
                          onFilterPropertyChange={handleMultipleFieldPropertyChange}
                          filter={{
                            ...getFilterFromCurrentData(filterField),
                            active: currentFilter?.active,
                          }}
                        >
                          <Typography>{filterField.label}</Typography>
                        </FilterContentBody>
                      )}
                    />
                  ) : (
                    <FilterContentBody
                      {...commonFilterBodyProps}
                      onFilterPropertyChange={onFilterPropertyChange}
                      filter={currentFilter}
                    />
                  )}
                </Accordion>
              );
            })}
        </form>
      </Paper>
    );
  }
);
FilterContent.displayName = 'FilterContent';
export default FilterContent;
