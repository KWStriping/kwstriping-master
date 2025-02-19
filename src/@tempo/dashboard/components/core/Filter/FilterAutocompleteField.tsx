import * as m from '@paraglide/messages';
import Link from '@tempo/ui/components/Link';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import type { MultiAutocompleteChoiceType } from '../../fields/MultiAutocompleteSelectField';
import styles from './index.module.css';
import type { FieldType, FilterFieldBaseProps } from './types';
import { toggle } from '@tempo/dashboard/oldSrc/utils/lists';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';

interface FilterAutocompleteFieldProps
  extends FilterFieldBaseProps<string, FieldType.autocomplete> {
  displayValues: FilterAutocompleteDisplayValues;
  setDisplayValues: (values: FilterAutocompleteDisplayValues) => void;
  initialDisplayValues: FilterAutocompleteDisplayValues;
}

export type FilterAutocompleteDisplayValues = Record<string, MultiAutocompleteChoiceType[]>;

const FilterAutocompleteField: FC<FilterAutocompleteFieldProps> = ({
  displayValues,
  filter,
  setDisplayValues,
  onFilterPropertyChange,
  initialDisplayValues,
  ...rest
}) => {
  const fieldDisplayValues = displayValues[filter.name] ?? [];
  const initialFieldDisplayValues = initialDisplayValues[filter.name];
  const availableOptions = filter.options.filter((option) =>
    fieldDisplayValues.every((displayValue) => displayValue.value !== option.value)
  );
  const displayNoResults = availableOptions.length === 0 && fieldDisplayValues.length === 0;

  const getUpdatedFilterValue = (option: MultiAutocompleteChoiceType) => {
    if (filter.multiple) {
      return toggle(option.value, filter.value, (a, b) => a === b);
    }

    return [option.value];
  };

  const handleChange = (option: MultiAutocompleteChoiceType) => {
    onFilterPropertyChange({
      payload: {
        name: filter.name,
        update: {
          active: true,
          value: getUpdatedFilterValue(option),
        },
      },
      type: 'set-property',
    });

    if (filter.multiple) {
      setDisplayValues({
        ...displayValues,
        [filter.name]: toggle(option, fieldDisplayValues, (a, b) => a.value === b.value),
      });
    }
  };

  const isValueChecked = (displayValue: MultiAutocompleteChoiceType) =>
    filter.value.includes(displayValue.value);

  const filteredValuesChecked = initialFieldDisplayValues.filter(isValueChecked);

  const filteredValuesUnchecked = fieldDisplayValues.filter(
    (displayValue) => !isValueChecked(displayValue)
  );

  const displayHr = !!filteredValuesChecked.length;

  return (
    <div {...rest}>
      {filter?.onSearchChange && (
        <TextField
          data-test-id="filter-field-autocomplete-input"
          className={styles.inputContainer ?? ''}
          fullWidth
          name={filter.name + '_autocomplete'}
          InputProps={{
            classes: {
              input: styles.input ?? '',
            },
          }}
          onChange={(event) => filter.onSearchChange(event.target.value)}
        />
      )}
      {filteredValuesChecked.map((displayValue) => (
        <div className={styles.option ?? ''} key={displayValue.value}>
          <FormControlLabel
            control={
              <Checkbox
                data-test-id={'filter-field-autocomplete-selected-' + filter.value}
                checked={filter.value.includes(displayValue.value)}
              />
            }
            label={displayValue.label}
            name={filter.name}
            onChange={() => handleChange(displayValue)}
          />
        </div>
      ))}
      {displayHr && <Divider className={styles.hr ?? ''} />}
      {displayNoResults && (
        <Typography
          data-test-id="filter-field-autocomplete-no-results"
          className={styles.noResults ?? ''}
          color="textSecondary"
        >
          <>
            {/* search */}

            {m.dashboard_nVtSS() ?? 'No results'}
          </>
        </Typography>
      )}
      {filteredValuesUnchecked.map((option) => (
        <div className={styles.option ?? ''} key={option.value} data-test-id="filter-option">
          <FormControlLabel
            control={
              <Checkbox
                data-test-id={'filter-field-autocomplete-option-' + filter.value}
                checked={filter.value.includes(option.value)}
              />
            }
            label={option.label}
            name={filter.name}
            onChange={() => handleChange(option)}
          />
        </div>
      ))}
      {filter.hasMore && (
        <Link
          data-test-id="filter-field-autocomplete-has-more"
          className={styles.showMore ?? ''}
          underline
          onClick={filter.onFetchMore}
        >
          <>
            {t(
              'dashboard_LCwT/',
              'Show more'
              // search results
            )}
          </>
        </Link>
      )}
    </div>
  );
};

FilterAutocompleteField.displayName = 'FilterAutocompleteField';
export default FilterAutocompleteField;
