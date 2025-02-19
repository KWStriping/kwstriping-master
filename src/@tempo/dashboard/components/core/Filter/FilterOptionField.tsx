import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import clsx from 'clsx';
import type { FC } from 'react';

import styles from './index.module.css';
import type { FieldType, FilterFieldBaseProps } from './types';
import { toggle } from '@tempo/dashboard/oldSrc/utils/lists';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';

const FilterOptionField: FC<FilterFieldBaseProps<string, FieldType.options>> = ({
  filter,
  onFilterPropertyChange,
  ...rest
}) => {
  const handleSelect = (value: string) =>
    onFilterPropertyChange({
      payload: {
        name: filter.name,
        update: {
          active: true,
          value: filter.multiple ? toggle(value, filter.value, (a, b) => a === b) : [value],
        },
      },
      type: 'set-property',
    });

  return (
    <div className={styles.root ?? ''} {...rest}>
      {filter.options.map((option) => (
        <div
          className={clsx(styles.option, !filter.multiple && styles.optionRadio)}
          key={option.value}
        >
          <FormControlLabel
            control={
              filter.multiple ? (
                <Checkbox
                  data-test-id={'filter-option-' + option.value}
                  checked={filter.value.includes(option.value)}
                />
              ) : (
                <Radio
                  data-test-id={'filter-option-' + option.value}
                  checked={filter.value[0] === option.value}
                  color="primary"
                />
              )
            }
            label={option.label}
            name={filter.name}
            onChange={() => handleSelect(option.value)}
          />
        </div>
      ))}
    </div>
  );
};

FilterOptionField.displayName = 'FilterOptionField';
export default FilterOptionField;
